<template>
    <div class="background-gradient"></div>
    <BackgroundParticles />
    <Navigation />
    
    <div class="profile-page">
        <div class="container">
            <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <p>Loading profile...</p>
            </div>

            <div v-else-if="error" class="error-state">
                <p class="error-message">{{ error }}</p>
                <router-link to="/leaderboard" class="btn btn-primary">Back to Leaderboard</router-link>
            </div>

            <div v-else-if="profile" class="profile-content">
                <!-- WoW-style Character Panel -->
                <div class="character-panel">
                    <!-- Left Side: Character Model & Gear -->
                    <div class="character-left-panel">
                        <!-- Character Model Area -->
                        <div class="character-model-container">
                            <div class="character-model-placeholder">
                                <div class="character-avatar">
                                    <div class="avatar-glow"></div>
                                    <div class="avatar-icon">⚔️</div>
                                </div>
                                <div class="character-level-badge">Lv. {{ getTotalLevel() }}</div>
                            </div>
                            
                            <!-- Gear Slots (Placeholder for future) -->
                            <div class="gear-slots">
                                <div class="gear-slot gear-slot-helmet" title="Helmet">
                                    <span class="gear-icon">🪖</span>
                                </div>
                                <div class="gear-slot gear-slot-chest" title="Chest">
                                    <span class="gear-icon">👕</span>
                                </div>
                                <div class="gear-slot gear-slot-pants" title="Pants">
                                    <span class="gear-icon">👖</span>
                                </div>
                                <div class="gear-slot gear-slot-gloves" title="Gloves">
                                    <span class="gear-icon">🧤</span>
                                </div>
                                <div class="gear-slot gear-slot-mainhand" title="Main Hand">
                                    <span class="gear-icon">⚔️</span>
                                </div>
                                <div class="gear-slot gear-slot-offhand" title="Off Hand">
                                    <span class="gear-icon">🛡️</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side: Stats & Info -->
                    <div class="character-right-panel">
                        <!-- Character Info Header -->
                        <div class="character-info-header">
                            <h1 class="character-name">{{ profile.username || username }}</h1>
                            <div class="character-meta">
                                <span class="character-class-placeholder">Class: <em>Coming Soon</em></span>
                                <span class="character-race-placeholder">Race: <em>Coming Soon</em></span>
                            </div>
                        </div>

                        <!-- Tabs -->
                        <div class="tabs-container">
                            <div class="tabs-header">
                                <button 
                                    @click="activeTab = 'attributes'"
                                    :class="['tab-button', { active: activeTab === 'attributes' }]"
                                >
                                    Attributes
                                </button>
                                <button 
                                    @click="activeTab = 'professions'"
                                    :class="['tab-button', { active: activeTab === 'professions' }]"
                                >
                                    ⚒️ Professions
                                </button>
                            </div>

                            <!-- Attributes Tab -->
                            <div v-show="activeTab === 'attributes'" class="tab-content">
                                <div class="stats-panel">
                                    <div class="stats-grid-compact">
                                        <div class="stat-row-compact">
                                            <span class="stat-name-compact">Strength</span>
                                            <span class="stat-value-compact">—</span>
                                        </div>
                                        <div class="stat-row-compact">
                                            <span class="stat-name-compact">Agility</span>
                                            <span class="stat-value-compact">—</span>
                                        </div>
                                        <div class="stat-row-compact">
                                            <span class="stat-name-compact">Intellect</span>
                                            <span class="stat-value-compact">—</span>
                                        </div>
                                        <div class="stat-row-compact">
                                            <span class="stat-name-compact">Stamina</span>
                                            <span class="stat-value-compact">—</span>
                                        </div>
                                        <div class="stat-row-compact">
                                            <span class="stat-name-compact">Health</span>
                                            <span class="stat-value-compact">—</span>
                                        </div>
                                        <div class="stat-row-compact">
                                            <span class="stat-name-compact">Mana</span>
                                            <span class="stat-value-compact">—</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Professions Tab -->
                            <div v-show="activeTab === 'professions'" class="tab-content">
                                <div class="professions-panel">
                                    <div v-if="profile.professions && Object.keys(profile.professions).length > 0" class="professions-list">
                                        <div 
                                            v-for="(profession, profName) in profile.professions" 
                                            :key="profName"
                                            class="profession-item"
                                        >
                                            <div class="profession-item-header">
                                                <span class="profession-icon-small">{{ getProfessionIcon(profName) }}</span>
                                                <span class="profession-name-small">{{ formatProfessionName(profName) }}</span>
                                                <span class="profession-level">Lv. {{ profession.level || 0 }}</span>
                                            </div>
                                            <div class="profession-xp-bar-container">
                                                <div class="profession-xp-bar" :style="{ width: getXPPercentage(profession.xp || 0) + '%' }"></div>
                                                <span class="profession-xp-text">{{ formatNumber(profession.xp || 0) }} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="empty-professions">
                                        <p>No profession data available.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from '../components/Navigation.vue'
import BackgroundParticles from '../components/BackgroundParticles.vue'
import Footer from '../components/Footer.vue'
import { getUserProfile } from '../services/leaderboardService.js'

const route = useRoute()
const username = ref(route.params.username)
const profile = ref(null)
const loading = ref(true)
const error = ref(null)
const activeTab = ref('professions')

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M'
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
}

const formatProfessionName = (profName) => {
    return profName.charAt(0) + profName.slice(1).toLowerCase()
}

const getProfessionIcon = (profName) => {
    const icons = {
        'MINING': '⛏️',
        'FORESTRY': '🪓',
        'FARMING': '🌾',
        'BLACKSMITH': '🔨',
        'COOKING': '🍳',
        'ALCHEMIST': '⚗️',
        'CRAFTING': '🛠️'
    }
    return icons[profName] || '⚒️'
}

const getTotalLevel = () => {
    if (!profile.value?.professions) return 0
    return Object.values(profile.value.professions).reduce((sum, p) => sum + (p.level || 0), 0)
}

const getTotalXP = () => {
    if (!profile.value?.professions) return 0
    return Object.values(profile.value.professions).reduce((sum, p) => sum + (p.xp || 0), 0)
}

const getAverageLevel = () => {
    if (!profile.value?.professions) return 0
    const levels = Object.values(profile.value.professions).map(p => p.level || 0)
    const avg = levels.reduce((sum, l) => sum + l, 0) / levels.length
    return Math.round(avg)
}

const getXPPercentage = (xp) => {
    const maxXP = 500000
    return Math.min(100, (xp / maxXP) * 100)
}

const loadProfile = async () => {
    loading.value = true
    error.value = null
    
    try {
        const data = await getUserProfile(username.value)
        profile.value = data
    } catch (err) {
        error.value = err.message || 'Failed to load player profile. Please try again later.'
        console.error('Profile error:', err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    loadProfile()
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.profile-page {
    min-height: calc(100vh - 200px);
    padding: 8rem 2rem 4rem;
    position: relative;
}

.loading-state,
.error-state {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-secondary);
}

.error-message {
    color: var(--primary-orange);
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.spinner {
    border: 3px solid var(--border-color);
    border-top: 3px solid var(--primary-orange);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.profile-content {
    max-width: 1400px;
    margin: 0 auto;
}

/* WoW-style Character Panel */
.character-panel {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 2rem;
    background: var(--card-bg);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

/* Left Panel: Character Model & Gear */
.character-left-panel {
    display: flex;
    flex-direction: column;
}

.character-model-container {
    position: relative;
    background: linear-gradient(135deg, rgba(255, 106, 0, 0.05), rgba(184, 134, 11, 0.02));
    border: 2px solid var(--border-color);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
}

.character-model-placeholder {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 300px;
    justify-content: center;
}

.character-avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 106, 0, 0.3), rgba(184, 134, 11, 0.2));
    border: 4px solid var(--primary-orange);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 0 30px rgba(255, 106, 0, 0.4);
    margin-bottom: 1rem;
}

.avatar-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 106, 0, 0.3), transparent);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
}

.character-avatar .avatar-icon {
    font-size: 5rem;
    z-index: 1;
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
}

.character-level-badge {
    position: absolute;
    bottom: 1rem;
    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
    color: var(--text-primary);
    padding: 0.5rem 1.5rem;
    border-radius: 20px;
    font-weight: 700;
    font-size: 1.1rem;
    box-shadow: 0 4px 12px rgba(255, 106, 0, 0.4);
    border: 2px solid var(--text-primary);
}

/* Gear Slots - WoW Style */
.gear-slots {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    margin-top: 1rem;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
}

.gear-slot {
    aspect-ratio: 1;
    background: rgba(0, 0, 0, 0.3);
    border: 2px solid var(--border-color);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.gear-slot:hover {
    background: rgba(255, 106, 0, 0.1);
    border-color: var(--primary-orange);
    transform: scale(1.05);
}

.gear-slot::after {
    content: '';
    position: absolute;
    top: 2px;
    right: 2px;
    width: 8px;
    height: 8px;
    background: rgba(255, 106, 0, 0.3);
    border-radius: 2px;
}

.gear-icon {
    font-size: 1.5rem;
    opacity: 0.5;
}

.gear-slot:hover .gear-icon {
    opacity: 1;
}

/* Gear Slot Positioning */
.gear-slot-helmet { grid-column: 1; grid-row: 1; }
.gear-slot-chest { grid-column: 2; grid-row: 1; }
.gear-slot-pants { grid-column: 1; grid-row: 2; }
.gear-slot-gloves { grid-column: 2; grid-row: 2; }
.gear-slot-mainhand { grid-column: 1; grid-row: 3; }
.gear-slot-offhand { grid-column: 2; grid-row: 3; }

/* Right Panel: Stats & Info */
.character-right-panel {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.character-info-header {
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.character-name {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, var(--primary-orange), var(--accent-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
}

.character-meta {
    display: flex;
    gap: 2rem;
    color: var(--text-secondary);
    font-size: 0.95rem;
}

.character-meta em {
    color: var(--text-secondary);
    font-style: italic;
    opacity: 0.7;
}

/* Tabs */
.tabs-container {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
}

.tabs-header {
    display: flex;
    border-bottom: 2px solid var(--border-color);
    background: rgba(0, 0, 0, 0.3);
}

.tab-button {
    flex: 1;
    padding: 1rem 1.5rem;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 3px solid transparent;
    position: relative;
}

.tab-button:hover {
    color: var(--secondary-orange);
    background: rgba(255, 106, 0, 0.05);
}

.tab-button.active {
    color: var(--secondary-orange);
    border-bottom-color: var(--primary-orange);
    background: rgba(255, 106, 0, 0.1);
}

.tab-content {
    padding: 1.25rem;
    min-height: 300px;
}

/* Stats Panel */
.stats-panel,
.professions-panel {
    background: transparent;
    border: none;
    border-radius: 0;
    padding: 0;
}

.panel-title {
    font-size: 1.25rem;
    color: var(--secondary-orange);
    font-weight: 700;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color);
}

.stats-grid-compact {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.stat-row-compact {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-color);
    border-radius: 6px;
}

.stat-name-compact {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.9rem;
}

.stat-value-compact {
    color: var(--accent-gold);
    font-weight: 700;
    font-family: 'Courier New', monospace;
    font-size: 1rem;
}

/* Professions List */
.professions-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
}

.profession-item {
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.75rem;
    transition: all 0.3s;
}

.profession-item:hover {
    background: rgba(255, 106, 0, 0.1);
    border-color: rgba(255, 106, 0, 0.4);
}

.profession-item-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
}

.profession-icon-small {
    font-size: 1.25rem;
}

.profession-name-small {
    flex: 1;
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.95rem;
}

.profession-level {
    color: var(--accent-gold);
    font-weight: 700;
    font-size: 0.9rem;
    font-family: 'Courier New', monospace;
}

.profession-xp-bar-container {
    position: relative;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    height: 16px;
    overflow: hidden;
    border: 1px solid var(--border-color);
}

.profession-xp-bar {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-orange), var(--accent-gold));
    border-radius: 4px;
    transition: width 0.5s ease;
    box-shadow: 0 0 8px rgba(255, 106, 0, 0.5);
}

.profession-xp-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.65rem;
    font-weight: 600;
    color: var(--text-primary);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
    z-index: 1;
}

.empty-professions {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
    font-style: italic;
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

@media (max-width: 1200px) {
    .character-panel {
        grid-template-columns: 320px 1fr;
    }
    
    .character-avatar {
        width: 160px;
        height: 160px;
    }
    
    .character-avatar .avatar-icon {
        font-size: 4rem;
    }
}

@media (max-width: 968px) {
    .character-panel {
        grid-template-columns: 1fr;
    }
    
    .character-model-container {
        max-width: 400px;
        margin: 0 auto;
    }
    
    .gear-slots {
        grid-template-columns: repeat(3, 1fr);
        max-width: 250px;
        margin: 1rem auto 0;
    }
    
    .gear-slot-helmet { grid-column: 1; grid-row: 1; }
    .gear-slot-chest { grid-column: 2; grid-row: 1; }
    .gear-slot-pants { grid-column: 3; grid-row: 1; }
    .gear-slot-gloves { grid-column: 1; grid-row: 2; }
    .gear-slot-mainhand { grid-column: 2; grid-row: 2; }
    .gear-slot-offhand { grid-column: 3; grid-row: 2; }
}

@media (max-width: 768px) {
    .profile-page {
        padding: 6rem 1rem 2rem;
    }
    
    .character-panel {
        padding: 1.5rem;
    }
    
    .character-name {
        font-size: 2rem;
    }
    
    .professions-list {
        grid-template-columns: 1fr;
    }
    
    .stats-grid-compact {
        grid-template-columns: 1fr;
    }
}
</style>
