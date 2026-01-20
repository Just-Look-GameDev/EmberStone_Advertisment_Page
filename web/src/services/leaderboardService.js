// Use environment variable or default to Cloudflare Worker proxy
// The Cloudflare Worker handles the custom certificate issue by proxying through Cloudflare's infrastructure
// Options:
// 1. Cloudflare Worker (recommended): https://api.emberstone.net/api or workers.dev URL
// 2. Direct subdomain (if HTTPS enabled): https://join.emberstone.net:3000/api
// Default: Use deployed Cloudflare Worker endpoint
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://emberstone-api-proxy.emberstone.workers.dev/api'

/**
 * Generate dummy leaderboard data for development
 * @param {string} profession - The profession name
 * @param {number} limit - Number of players to return
 * @param {string} sort - Sort method
 * @returns {Object} Dummy leaderboard data
 */
function generateDummyLeaderboard(profession, limit, sort) {
  const dummyUsernames = [
    'Mindsaver', 'DragonSlayer', 'IronForge', 'ShadowHunter', 'FireMage',
    'StoneCutter', 'TreeMaster', 'CropKing', 'MetalWorker', 'ChefMaster',
    'PotionBrewer', 'CraftMaster', 'MineLord', 'ForestGuard', 'FarmHero',
    'BladeSmith', 'KitchenWizard', 'AlchemyPro', 'BuildExpert', 'ResourceKing',
    'OreMiner', 'WoodCutter', 'SeedPlanter', 'AnvilMaster', 'RecipeGuru',
    'ElixirMaker', 'ToolCrafter', 'GemHunter', 'LogHarvester', 'WheatGrower'
  ]
  
  const players = []
  const usedNames = new Set()
  
  for (let i = 0; i < limit && i < dummyUsernames.length; i++) {
    let username
    do {
      username = dummyUsernames[Math.floor(Math.random() * dummyUsernames.length)]
    } while (usedNames.has(username))
    usedNames.add(username)
    
    const baseLevel = 100 - (i * 3)
    const baseXp = 500000 - (i * 15000)
    
    players.push({
      username: username,
      level: Math.max(1, baseLevel + Math.floor(Math.random() * 10) - 5),
      xp: Math.max(0, baseXp + Math.floor(Math.random() * 20000) - 10000),
      professions: profession === 'ALL' || profession === 'OVERALL' 
        ? Math.floor(Math.random() * 7) + 1 
        : undefined
    })
  }
  
  // Sort based on sort parameter
  if (sort === 'level_only') {
    players.sort((a, b) => b.level - a.level)
  } else if (sort === 'xp_only') {
    players.sort((a, b) => b.xp - a.xp)
  } else {
    // level_xp - sort by level first, then XP
    players.sort((a, b) => {
      if (b.level !== a.level) return b.level - a.level
      return b.xp - a.xp
    })
  }
  
  return {
    profession: profession,
    players: players,
    total: players.length,
    limit: limit
  }
}

/**
 * Fetch leaderboard data for a specific profession
 * @param {string} profession - The profession name (MINING, FORESTRY, FARMING, BLACKSMITH, COOKING, ALCHEMIST, CRAFTING, ALL, OVERALL)
 * @param {number} limit - Number of players to return (default: 10, max: 100)
 * @param {string} sort - Sort method: 'level_xp', 'level_only', or 'xp_only' (default: 'level_xp')
 * @returns {Promise<Object>} Leaderboard data
 */
export async function getLeaderboard(profession = 'ALL', limit = 10, sort = 'level_xp') {
  // Use dummy data in development mode
  if (import.meta.env.DEV) {
    console.log('🔧 Development mode: Using dummy leaderboard data for', profession)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return generateDummyLeaderboard(profession, limit, sort)
  }
  
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
    
    // Fallback to dummy data in development if API fails
    if (import.meta.env.DEV) {
      console.warn('⚠️ API failed, using dummy data as fallback')
      return generateDummyLeaderboard(profession, limit, sort)
    }
    
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

/**
 * Generate dummy profile data for development
 * @param {string} username - The username
 * @returns {Object} Dummy profile data
 */
function generateDummyProfile(username) {
  const professions = ['MINING', 'FORESTRY', 'FARMING', 'BLACKSMITH', 'COOKING', 'ALCHEMIST', 'CRAFTING']
  const professionData = {}
  
  professions.forEach(prof => {
    professionData[prof] = {
      level: Math.floor(Math.random() * 100) + 1,
      xp: Math.floor(Math.random() * 500000) + 1000
    }
  })
  
  return {
    username: username,
    professions: professionData
  }
}

/**
 * Fetch user profile data including profession stats
 * @param {string} username - The username to fetch profile for
 * @returns {Promise<Object>} User profile data with profession stats
 */
export async function getUserProfile(username) {
  // Use dummy data in development mode
  if (import.meta.env.DEV) {
    console.log('🔧 Development mode: Using dummy profile data for', username)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return generateDummyProfile(username)
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}/player/${encodeURIComponent(username)}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    
    // Fallback to dummy data in development if API fails
    if (import.meta.env.DEV) {
      console.warn('⚠️ API failed, using dummy data as fallback')
      return generateDummyProfile(username)
    }
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Unable to connect to the API. Please check if the API server is running.')
    }
    
    throw error
  }
}