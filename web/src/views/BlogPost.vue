<template>
    <div id="top"></div>
    <div class="background-gradient"></div>
    
    <Navigation />
    
    <article v-if="loading" class="blog-post-section">
        <div class="container">
            <div class="loading-state">
                <p>Loading post...</p>
            </div>
        </div>
    </article>

    <article v-else-if="error || !post" class="blog-post-section">
        <div class="container">
            <div class="error-state">
                <h1>Post Not Found</h1>
                <p>The blog post you're looking for doesn't exist.</p>
                <router-link to="/blog" class="btn btn-primary">Back to Blog</router-link>
            </div>
        </div>
    </article>

    <article v-else class="blog-post-section">
        <div class="container">
            <router-link to="/blog" class="back-link">← Back to Blog</router-link>

            <header class="blog-post-header">
                <h1 class="blog-post-title">{{ post.title }}</h1>
                <div class="blog-post-meta">
                    <span class="blog-post-author">By {{ post.author }}</span>
                    <span class="blog-post-date">{{ formatDate(post.publishedAt) }}</span>
                </div>
                <div v-if="post.featuredImage" class="blog-post-featured-image">
                    <img 
                        :src="getImageUrl(post.featuredImage)" 
                        :alt="post.title"
                        loading="eager"
                    />
                </div>
            </header>

            <div class="blog-post-content">
                <PortableText :value="post.content" :components="components" />
            </div>

            <nav v-if="adjacentPosts.previous || adjacentPosts.next" class="blog-post-navigation">
                <router-link 
                    v-if="adjacentPosts.previous" 
                    :to="`/blog/${adjacentPosts.previous.slug.current}`"
                    class="nav-link nav-link-prev"
                >
                    <span class="nav-link-label">Previous</span>
                    <span class="nav-link-title">{{ adjacentPosts.previous.title }}</span>
                </router-link>
                <div v-else class="nav-link-spacer"></div>
                <router-link 
                    v-if="adjacentPosts.next" 
                    :to="`/blog/${adjacentPosts.next.slug.current}`"
                    class="nav-link nav-link-next"
                >
                    <span class="nav-link-label">Next</span>
                    <span class="nav-link-title">{{ adjacentPosts.next.title }}</span>
                </router-link>
            </nav>
        </div>
    </article>

    <Footer />
</template>

<script setup>
import { ref, onMounted, h } from 'vue'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import { PortableText } from '@portabletext/vue'
import { getPostBySlug, getAdjacentPosts } from '../services/blogService.js'
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(false)
const adjacentPosts = ref({ previous: null, next: null })

const getImageUrl = (image) => {
    if (!image || !image.asset) return null
    // Image URL is now directly available from the query
    return image.asset.url || null
}


const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
        return format(new Date(dateString), 'MMMM d, yyyy')
    } catch (e) {
        return dateString
    }
}

const components = {
    types: {
        image: ({ value }) => {
            if (!value?.asset) return null
            // Image URL is now directly available from the query
            const imageUrl = value.asset.url || null
            if (!imageUrl) return null
            return h('img', {
                src: imageUrl,
                alt: value.alt || '',
                loading: 'lazy',
                style: 'max-width: 100%; height: auto; border-radius: 8px; margin: 2rem 0;'
            })
        },
    },
    marks: {
        link: ({ children, value }) => {
            return h('a', {
                href: value?.href || '#',
                target: value?.blank ? '_blank' : undefined,
                rel: value?.blank ? 'noopener noreferrer' : undefined,
                style: 'color: var(--secondary-orange); text-decoration: underline;'
            }, children)
        },
    },
}

onMounted(async () => {
    try {
        loading.value = true
        error.value = false
        const slug = route.params.slug
        post.value = await getPostBySlug(slug)
        
        if (post.value) {
            // Fetch adjacent posts
            const adjacent = await getAdjacentPosts(post.value.publishedAt, post.value._id)
            adjacentPosts.value = adjacent
        } else {
            error.value = true
        }
    } catch (err) {
        console.error('Failed to load blog post:', err)
        error.value = true
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.blog-post-section {
    min-height: 100vh;
    padding: 8rem 0 4rem;
}

.loading-state,
.error-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
}

.error-state h1 {
    color: var(--primary-orange);
    margin-bottom: 1rem;
}

.btn {
    display: inline-block;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
    color: var(--text-primary);
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 106, 0, 0.3);
}

.back-link {
    display: inline-block;
    color: var(--text-secondary);
    text-decoration: none;
    margin-bottom: 2rem;
    transition: color 0.3s;
}

.back-link:hover {
    color: var(--secondary-orange);
}

.blog-post-header {
    margin-bottom: 3rem;
}

.blog-post-title {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary-orange), var(--accent-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.blog-post-meta {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
    color: var(--text-secondary);
    font-size: 1rem;
}

.blog-post-author {
    font-weight: 500;
    color: var(--accent-gold);
}

.blog-post-featured-image {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.blog-post-featured-image img {
    width: 100%;
    height: auto;
    display: block;
}

.blog-post-content {
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.8;
    color: var(--text-primary);
    font-size: 1.1rem;
}

.blog-post-content :deep(h2) {
    font-size: 2rem;
    color: var(--secondary-orange);
    margin: 3rem 0 1.5rem;
    font-weight: 600;
}

.blog-post-content :deep(h3) {
    font-size: 1.5rem;
    color: var(--secondary-orange);
    margin: 2.5rem 0 1rem;
    font-weight: 600;
}

.blog-post-content :deep(p) {
    margin-bottom: 1.5rem;
    color: var(--text-secondary);
}

.blog-post-content :deep(ul),
.blog-post-content :deep(ol) {
    margin: 1.5rem 0;
    padding-left: 2rem;
    color: var(--text-secondary);
}

.blog-post-content :deep(li) {
    margin-bottom: 0.5rem;
}

.blog-post-content :deep(strong) {
    color: var(--text-primary);
    font-weight: 600;
}

.blog-post-content :deep(em) {
    font-style: italic;
}

.blog-post-content :deep(blockquote) {
    border-left: 4px solid var(--primary-orange);
    padding-left: 1.5rem;
    margin: 2rem 0;
    color: var(--text-secondary);
    font-style: italic;
}

.blog-post-content :deep(code) {
    background: rgba(255, 106, 0, 0.1);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
    color: var(--secondary-orange);
}

.blog-post-content :deep(pre) {
    background: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 2rem 0;
    border: 1px solid var(--border-color);
}

.blog-post-content :deep(pre code) {
    background: none;
    padding: 0;
    color: var(--text-primary);
}

.blog-post-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 4rem;
    padding-top: 3rem;
    border-top: 1px solid var(--border-color);
    gap: 2rem;
}

.nav-link {
    flex: 1;
    padding: 1.5rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.nav-link:hover {
    border-color: rgba(255, 106, 0, 0.4);
    transform: translateY(-2px);
}

.nav-link-label {
    font-size: 0.9rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.nav-link-title {
    color: var(--secondary-orange);
    font-weight: 600;
}

.nav-link-next {
    text-align: right;
}

.nav-link-spacer {
    flex: 1;
}

@media (max-width: 768px) {
    .blog-post-title {
        font-size: 2rem;
    }
    
    .blog-post-content {
        font-size: 1rem;
    }
    
    .blog-post-navigation {
        flex-direction: column;
    }
    
    .nav-link-next {
        text-align: left;
    }
}
</style>
