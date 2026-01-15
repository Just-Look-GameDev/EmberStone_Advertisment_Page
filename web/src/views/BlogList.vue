<template>
    <div id="top"></div>
    <div class="background-gradient"></div>
    
    <Navigation />
    
    <section class="blog-section">
        <div class="container">
            <div class="section-header">
                <h1 class="section-title">News & Updates</h1>
                <p class="section-subtitle">Latest news and updates from EmberStone</p>
            </div>

            <!-- Category Filter -->
            <div v-if="!loading && categories.length > 0" class="category-filter">
                <button 
                    @click="selectedCategory = null"
                    :class="['category-btn', { active: selectedCategory === null }]"
                >
                    All
                </button>
                <button 
                    v-for="category in categories" 
                    :key="category"
                    @click="selectedCategory = category"
                    :class="['category-btn', { active: selectedCategory === category }]"
                >
                    {{ category }}
                </button>
            </div>

            <div v-if="loading" class="loading-state">
                <p>Loading posts...</p>
            </div>

            <div v-else-if="error" class="error-state">
                <p>Error loading blog posts. Please try again later.</p>
            </div>

            <div v-else-if="filteredPosts.length === 0" class="empty-state">
                <p>No blog posts found{{ selectedCategory ? ` in "${selectedCategory}"` : '' }}. Check back soon!</p>
            </div>

            <div v-else class="blog-layout">
                <!-- Top Posts in 3-Column Grid (9-12 posts) -->
                <div v-if="filteredPosts.length > 0" class="top-posts-row">
                    <article 
                        v-for="(post, index) in filteredPosts.slice(0, 12)" 
                        :key="post._id || post.slug?.current || post.slug"
                        class="top-post-card"
                    >
                        <router-link :to="`/blog/${post.slug?.current || post.slug}`" class="top-post-link">
                            <div v-if="post.featuredImage && getImageUrl(post.featuredImage)" class="top-post-image">
                                <img 
                                    :src="getImageUrl(post.featuredImage)" 
                                    :alt="post.title || 'Blog post'"
                                    :loading="index < 3 ? 'eager' : 'lazy'"
                                />
                            </div>
                            <div class="top-post-content">
                                <div v-if="post.categories && Array.isArray(post.categories) && post.categories.length > 0" class="top-post-categories">
                                    <span 
                                        v-for="cat in post.categories" 
                                        :key="cat"
                                        class="category-badge-small"
                                    >
                                        {{ cat }}
                                    </span>
                                </div>
                                <h2 class="top-post-title">{{ post.title || 'Untitled' }}</h2>
                                <p v-if="post.excerpt" class="top-post-excerpt">{{ truncateExcerpt(post.excerpt) }}</p>
                                <div class="top-post-meta">
                                    <span class="top-post-author">{{ post.author || 'Unknown' }}</span>
                                    <span class="top-post-date">{{ formatDate(post.publishedAt) }}</span>
                                </div>
                            </div>
                        </router-link>
                    </article>
                </div>

                <!-- Remaining Posts - One per Row -->
                <div v-if="filteredPosts.length > 12" class="single-posts-list">
                    <article 
                        v-for="post in filteredPosts.slice(12)" 
                        :key="post._id || post.slug?.current || post.slug" 
                        class="single-post-card"
                    >
                        <router-link :to="`/blog/${post.slug?.current || post.slug}`" class="single-post-link">
                            <div v-if="post.featuredImage && getImageUrl(post.featuredImage)" class="single-post-image">
                                <img 
                                    :src="getImageUrl(post.featuredImage)" 
                                    :alt="post.title || 'Blog post'"
                                    loading="lazy"
                                />
                            </div>
                            <div class="single-post-content">
                                <div v-if="post.categories && Array.isArray(post.categories) && post.categories.length > 0" class="single-post-categories">
                                    <span 
                                        v-for="cat in post.categories" 
                                        :key="cat"
                                        class="category-badge-small"
                                    >
                                        {{ cat }}
                                    </span>
                                </div>
                                <h3 class="single-post-title">{{ post.title || 'Untitled' }}</h3>
                                <p v-if="post.excerpt" class="single-post-excerpt">{{ truncateExcerpt(post.excerpt) }}</p>
                                <div class="single-post-meta">
                                    <span class="single-post-author">{{ post.author || 'Unknown' }}</span>
                                    <span class="single-post-date">{{ formatDate(post.publishedAt) }}</span>
                                </div>
                            </div>
                        </router-link>
                    </article>
                </div>
            </div>
        </div>
    </section>

    <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { format } from 'date-fns'
import { getAllPosts, getAllCategories } from '../services/blogService.js'
import Navigation from '../components/Navigation.vue'
import Footer from '../components/Footer.vue'

const posts = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(false)
const selectedCategory = ref(null)

const filteredPosts = computed(() => {
    if (!selectedCategory.value) {
        return posts.value || []
    }
    return (posts.value || []).filter(post => 
        post.categories && 
        Array.isArray(post.categories) && 
        post.categories.includes(selectedCategory.value)
    )
})

const getImageUrl = (image) => {
    if (!image || !image.asset) return null
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

const truncateExcerpt = (text, maxLength = 200) => {
    if (!text) return ''
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

onMounted(async () => {
    try {
        loading.value = true
        error.value = false
        // Load posts and categories in parallel
        const [postsData, categoriesData] = await Promise.all([
            getAllPosts(),
            getAllCategories()
        ])
        posts.value = Array.isArray(postsData) ? postsData : []
        categories.value = Array.isArray(categoriesData) ? categoriesData : []
    } catch (err) {
        console.error('Failed to load blog data:', err)
        error.value = true
        posts.value = []
        categories.value = []
    } finally {
        loading.value = false
    }
})
</script>

<style scoped>
.blog-section {
    min-height: 100vh;
    padding: 6rem 0 3rem;
}

.loading-state,
.error-state,
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
}

/* Category Filter */
.category-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin: 2rem 0 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
}

.category-btn {
    padding: 0.6rem 1.2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-secondary);
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    font-size: 0.9rem;
}

.category-btn:hover {
    border-color: var(--primary-orange);
    color: var(--secondary-orange);
    transform: translateY(-2px);
}

.category-btn.active {
    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
    border-color: var(--primary-orange);
    color: var(--text-primary);
    box-shadow: 0 4px 12px rgba(255, 106, 0, 0.3);
}

/* Blog Layout */
.blog-layout {
    margin-top: 2rem;
}

/* Top 3 Posts Row */
.top-posts-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.top-post-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
}

.top-post-card:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 106, 0, 0.4);
    box-shadow: 0 15px 30px rgba(255, 106, 0, 0.1);
}

.top-post-link {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.top-post-image {
    width: 100%;
    height: 180px;
    overflow: hidden;
    background: var(--dark-bg);
}

.top-post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.top-post-card:hover .top-post-image img {
    transform: scale(1.05);
}

.top-post-content {
    padding: 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.top-post-categories {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
}

.top-post-title {
    font-size: 1.25rem;
    color: var(--secondary-orange);
    margin-bottom: 0.75rem;
    font-weight: 600;
    line-height: 1.3;
    flex-grow: 1;
}

.top-post-excerpt {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
}

.top-post-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.85rem;
    color: var(--text-secondary);
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
    margin-top: auto;
}

.top-post-author {
    font-weight: 500;
    color: var(--accent-gold);
}

.top-post-date {
    opacity: 0.8;
}

/* Single Post Rows */
.single-posts-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.single-post-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
}

.single-post-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 106, 0, 0.4);
    box-shadow: 0 15px 30px rgba(255, 106, 0, 0.1);
}

.single-post-link {
    text-decoration: none;
    color: inherit;
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
    align-items: center;
}

.single-post-image {
    width: 100%;
    height: 150px;
    overflow: hidden;
    background: var(--dark-bg);
}

.single-post-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s;
}

.single-post-card:hover .single-post-image img {
    transform: scale(1.05);
}

.single-post-content {
    padding: 1.5rem 1.5rem 1.5rem 0;
    display: flex;
    flex-direction: column;
}

.single-post-categories {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
}

.single-post-title {
    font-size: 1.4rem;
    color: var(--secondary-orange);
    margin-bottom: 0.75rem;
    font-weight: 600;
    line-height: 1.3;
}

.single-post-excerpt {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.single-post-meta {
    display: flex;
    gap: 1.5rem;
    font-size: 0.85rem;
    color: var(--text-secondary);
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-color);
}

.single-post-author {
    font-weight: 500;
    color: var(--accent-gold);
}

.single-post-date {
    opacity: 0.8;
}

.category-badge-small {
    padding: 0.3rem 0.75rem;
    background: rgba(255, 106, 0, 0.15);
    border: 1px solid rgba(255, 106, 0, 0.3);
    border-radius: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--secondary-orange);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

@media (max-width: 968px) {
    .top-posts-row {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.25rem;
    }
    
    .top-post-image {
        height: 160px;
    }
    
    .single-post-link {
        grid-template-columns: 180px 1fr;
        gap: 1.25rem;
    }
    
    .single-post-image {
        height: 140px;
    }
    
    .single-post-content {
        padding: 1.25rem 1.25rem 1.25rem 0;
    }
    
    .single-post-title {
        font-size: 1.3rem;
    }
}

@media (max-width: 768px) {
    .blog-section {
        padding: 5rem 0 2rem;
    }
    
    .top-posts-row {
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }
    
    .top-post-image {
        height: 180px;
    }
    
    .single-post-link {
        grid-template-columns: 1fr;
        gap: 0;
    }
    
    .single-post-image {
        width: 100%;
        height: 200px;
    }
    
    .single-post-content {
        padding: 1.5rem;
    }
    
    .single-post-title {
        font-size: 1.25rem;
    }
    
    .category-filter {
        gap: 0.6rem;
    }
    
    .category-btn {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
    }
}
</style>
