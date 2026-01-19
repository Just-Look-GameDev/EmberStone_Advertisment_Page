// Use environment variable or default to Cloudflare Worker proxy
// The Cloudflare Worker handles the custom certificate issue by proxying through Cloudflare's infrastructure
// Options:
// 1. Cloudflare Worker (recommended): https://api.emberstone.net/api or workers.dev URL
// 2. Direct subdomain (if HTTPS enabled): https://join.emberstone.net:3000/api
// Default: Use deployed Cloudflare Worker endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://emberstone-api-proxy.emberstone.workers.dev/api'

/**
 * Fetch leaderboard data for a specific profession
 * @param {string} profession - The profession name (MINING, FORESTRY, FARMING, BLACKSMITH, COOKING, ALCHEMIST, CRAFTING, ALL, OVERALL)
 * @param {number} limit - Number of players to return (default: 10, max: 100)
 * @param {string} sort - Sort method: 'level_xp', 'level_only', or 'xp_only' (default: 'level_xp')
 * @returns {Promise<Object>} Leaderboard data
 */
export async function getLeaderboard(profession = 'ALL', limit = 10, sort = 'level_xp') {
  try {
    const params = new URLSearchParams({
      profession: profession.toUpperCase(),
      limit: limit.toString(),
      sort: sort
    })
    
    const response = await fetch(`${API_BASE_URL}/leaderboard/professions?${params}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Unable to connect to the leaderboard API. Please check if the API server is running and the Cloudflare Worker is properly configured.')
    }
    
    throw error
  }
}

/**
 * Get list of valid professions
 */
export const PROFESSIONS = [
  { value: 'ALL', label: 'All Professions' },
  { value: 'MINING', label: 'Mining' },
  { value: 'FORESTRY', label: 'Forestry' },
  { value: 'FARMING', label: 'Farming' },
  { value: 'BLACKSMITH', label: 'Blacksmith' },
  { value: 'COOKING', label: 'Cooking' },
  { value: 'ALCHEMIST', label: 'Alchemist' },
  { value: 'CRAFTING', label: 'Crafting' }
]

/**
 * Get list of valid sort options
 */
export const SORT_OPTIONS = [
  { value: 'level_xp', label: 'Level & XP' },
  { value: 'level_only', label: 'Level Only' },
  { value: 'xp_only', label: 'XP Only' }
]
