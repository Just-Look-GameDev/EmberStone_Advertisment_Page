import { client } from '../config/sanity.js'

/**
 * Fetch all published blog posts, sorted by date (newest first)
 */
export async function getAllPosts() {
  try {
    const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      featuredImage {
        asset -> {
          _id,
          url
        },
        alt
      },
      categories
    }`
    
    const posts = await client.fetch(query)
    return posts
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

/**
 * Fetch all unique categories from published posts
 */
export async function getAllCategories() {
  try {
    // Fetch all posts with categories and extract unique categories
    const query = `*[_type == "post" && !(_id in path("drafts.**")) && defined(categories) && count(categories) > 0] {
      categories
    }`
    
    const posts = await client.fetch(query)
    const allCategories = posts
      .flatMap(post => post.categories || [])
      .filter(Boolean)
    
    // Get unique categories and sort
    const uniqueCategories = [...new Set(allCategories)]
    return uniqueCategories.sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getPostBySlug(slug) {
  try {
    const query = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      author,
      publishedAt,
      excerpt,
      featuredImage {
        asset -> {
          _id,
          url
        },
        alt
      },
      content[] {
        ...,
        _type == "image" => {
          ...,
          asset -> {
            _id,
            url
          }
        }
      },
      categories
    }`
    
    const post = await client.fetch(query, { slug })
    return post
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
}

/**
 * Fetch the next and previous posts for navigation
 */
export async function getAdjacentPosts(currentPostDate, currentPostId) {
  try {
    const [previous, next] = await Promise.all([
      // Previous (newer) post
      client.fetch(
        `*[_type == "post" && !(_id in path("drafts.**")) && publishedAt > $date && _id != $id] | order(publishedAt asc) [0] {
          _id,
          title,
          slug
        }`,
        { date: currentPostDate, id: currentPostId }
      ),
      // Next (older) post
      client.fetch(
        `*[_type == "post" && !(_id in path("drafts.**")) && publishedAt < $date && _id != $id] | order(publishedAt desc) [0] {
          _id,
          title,
          slug
        }`,
        { date: currentPostDate, id: currentPostId }
      ),
    ])
    
    return { previous, next }
  } catch (error) {
    console.error('Error fetching adjacent posts:', error)
    return { previous: null, next: null }
  }
}
