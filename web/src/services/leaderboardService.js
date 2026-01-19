const API_BASE_URL = 'http://65.109.30.254:3000/api'

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
