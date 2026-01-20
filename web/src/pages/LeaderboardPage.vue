<template>
    <div class="background-gradient"></div>
    <BackgroundParticles />
    <Navigation />
    
    <div class="leaderboard-page">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h1 class="section-title">🏆 Professions Leaderboard</h1>
                    <p class="section-subtitle">Compete with the best players across all professions</p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="leaderboard-controls">
                    <div class="control-group">
                        <label for="profession-select">Profession:</label>
                        <select 
                            id="profession-select"
                            v-model="selectedProfession" 
                            @change="loadLeaderboard"
                            class="select-input"
                        >
                            <option v-for="prof in professions" :key="prof.value" :value="prof.value">
                                {{ prof.label }}
                            </option>
                        </select>
                    </div>

                    <div class="control-group">
                        <label for="sort-select">Sort By:</label>
                        <select 
                            id="sort-select"
                            v-model="selectedSort" 
                            @change="loadLeaderboard"
                            class="select-input"
                        >
                            <option v-for="sort in sortOptions" :key="sort.value" :value="sort.value">
                                {{ sort.label }}
                            </option>
                        </select>
                    </div>

                    <div class="control-group">
                        <label for="limit-select">Players:</label>
                        <select 
                            id="limit-select"
                            v-model="selectedLimit" 
                            @change="loadLeaderboard"
                            class="select-input"
                        >
                            <option :value="10">Top 10</option>
                            <option :value="25">Top 25</option>
                            <option :value="50">Top 50</option>
                            <option :value="100">Top 100</option>
                        </select>
                    </div>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="leaderboard-container">
                    <div v-if="loading" class="loading-state">
                        <div class="spinner"></div>
                        <p>Loading leaderboard...</p>
                    </div>

                    <div v-else-if="error" class="error-state">
                        <p class="error-message">{{ error }}</p>
                        <button @click="loadLeaderboard" class="retry-btn">Retry</button>
                    </div>

                    <div v-else-if="leaderboardData && leaderboardData.players && leaderboardData.players.length > 0" class="leaderboard-table-wrapper">
                        <table class="leaderboard-table">
                            <thead>
                                <tr>
                                    <th class="rank-col">Rank</th>
                                    <th class="player-col">Player</th>
                                    <th class="level-col">Level</th>
                                    <th class="xp-col">XP</th>
                                    <th v-if="isOverall" class="professions-col">Professions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="(player, index) in leaderboardData.players" 
                                    :key="player.username"
                                    :class="{ 'top-three': index < 3 }"
                                >
                                    <td class="rank-col">
                                        <span class="rank-badge" :class="getRankClass(index)">
                                            {{ index + 1 }}
                                        </span>
                                    </td>
                                    <td class="player-col">
                                        <router-link :to="`/player/${player.username}`" class="player-name-link">
                                            <span class="player-name">{{ player.username }}</span>
                                        </router-link>
                                    </td>
                                    <td class="level-col">
                                        <span class="level-value">{{ formatNumber(player.level) }}</span>
                                    </td>
                                    <td class="xp-col">
                                        <span class="xp-value">{{ formatNumber(player.xp) }}</span>
                                    </td>
                                    <td v-if="isOverall" class="professions-col">
                                        <span class="professions-value">{{ player.professions || 0 }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div v-else class="empty-state">
                        <p>No players found for this profession.</p>
                    </div>
                </div>
            </FadeInWrapper>
        </div>
    </div>
    
    <Footer />
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import Navigation from '../components/Navigation.vue'
import BackgroundParticles from '../components/BackgroundParticles.vue'
import Footer from '../components/Footer.vue'
import FadeInWrapper from '../components/FadeInWrapper.vue'
import { getLeaderboard, PROFESSIONS, SORT_OPTIONS } from '../services/leaderboardService.js'

const selectedProfession = ref('ALL')
const selectedSort = ref('level_xp')
const selectedLimit = ref(10)
const leaderboardData = ref(null)
const loading = ref(false)
const error = ref(null)

const professions = PROFESSIONS
const sortOptions = SORT_OPTIONS

const isOverall = computed(() => {
    return selectedProfession.value === 'ALL' || selectedProfession.value === 'OVERALL'
})

const loadLeaderboard = async () => {
    loading.value = true
    error.value = null
    
    try {
        const data = await getLeaderboard(selectedProfession.value, selectedLimit.value, selectedSort.value)
        leaderboardData.value = data
    } catch (err) {
        error.value = err.message || 'Failed to load leaderboard. Please try again later.'
        console.error('Leaderboard error:', err)
    } finally {
        loading.value = false
    }
}

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M'
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toLocaleString()
}

const getRankClass = (index) => {
    if (index === 0) return 'rank-gold'
    if (index === 1) return 'rank-silver'
    if (index === 2) return 'rank-bronze'
    return ''
}

onMounted(() => {
    loadLeaderboard()
    window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.leaderboard-page {
    min-height: calc(100vh - 200px);
    padding: 8rem 2rem 4rem;
    position: relative;
}

.leaderboard-controls {
    display: flex;
    gap: 2rem;
    margin: 3rem 0;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-end;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.control-group label {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
}

.select-input {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: var(--text-primary);
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
    min-width: 180px;
}

.select-input:hover {
    border-color: rgba(255, 106, 0, 0.4);
}

.select-input:focus {
    outline: none;
    border-color: var(--primary-orange);
    box-shadow: 0 0 0 3px rgba(255, 106, 0, 0.1);
}

.leaderboard-container {
    margin-top: 3rem;
}

.loading-state,
.error-state,
.empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid var(--border-color);
    border-top-color: var(--primary-orange);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.error-message {
    color: #ff6b6b;
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.retry-btn {
    background: var(--primary-orange);
    border: none;
    color: var(--dark-bg);
    padding: 0.75rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.retry-btn:hover {
    background: var(--secondary-orange);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 106, 0, 0.3);
}

.leaderboard-table-wrapper {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 1.5rem;
    overflow-x: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.leaderboard-table thead {
    background: linear-gradient(135deg, rgba(255, 106, 0, 0.15), rgba(255, 140, 66, 0.1));
    border-bottom: 2px solid var(--primary-orange);
    position: sticky;
    top: 0;
    z-index: 10;
}

.leaderboard-table th {
    padding: 1.25rem 1.5rem;
    text-align: left;
    color: var(--secondary-orange);
    font-weight: 700;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 2px solid var(--primary-orange);
    white-space: nowrap;
}

.leaderboard-table th.rank-col {
    text-align: center;
}

.leaderboard-table th:first-child {
    border-top-left-radius: 16px;
}

.leaderboard-table th.level-col,
.leaderboard-table th.xp-col,
.leaderboard-table th.professions-col {
    text-align: right;
}

.leaderboard-table th:last-child {
    border-top-right-radius: 16px;
}

.leaderboard-table tbody tr {
    transition: all 0.2s ease;
    background: transparent;
}

.leaderboard-table tbody tr:nth-child(even) {
    background: rgba(255, 106, 0, 0.02);
}

.leaderboard-table tbody tr:last-child td {
    border-bottom: none;
}

.leaderboard-table tbody tr:last-child td:first-child {
    border-bottom-left-radius: 16px;
}

.leaderboard-table tbody tr:last-child td:last-child {
    border-bottom-right-radius: 16px;
}

.leaderboard-table tbody tr:hover {
    background: rgba(255, 106, 0, 0.08) !important;
}

.leaderboard-table tbody tr.top-three {
    background: linear-gradient(90deg, rgba(255, 106, 0, 0.06), rgba(255, 140, 66, 0.03)) !important;
}

.leaderboard-table tbody tr.top-three:hover {
    background: linear-gradient(90deg, rgba(255, 106, 0, 0.12), rgba(255, 140, 66, 0.08)) !important;
}

.leaderboard-table td {
    padding: 1.25rem 1.5rem;
    color: var(--text-primary);
    vertical-align: middle;
    border-bottom: 1px solid rgba(255, 106, 0, 0.1);
}

.rank-col {
    width: 120px;
    text-align: center;
    padding-left: 1rem;
    padding-right: 1rem;
}

.rank-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: rgba(255, 106, 0, 0.2);
    color: var(--text-primary);
    font-weight: 700;
    font-size: 1rem;
    border: 2px solid rgba(255, 106, 0, 0.3);
    transition: all 0.3s ease;
}

.rank-badge.rank-gold {
    background: linear-gradient(135deg, #ffd700, #ffed4e);
    color: var(--dark-bg);
    border-color: #ffd700;
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.rank-badge.rank-silver {
    background: linear-gradient(135deg, #c0c0c0, #e8e8e8);
    color: var(--dark-bg);
    border-color: #c0c0c0;
    box-shadow: 0 0 15px rgba(192, 192, 192, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
}

.rank-badge.rank-bronze {
    background: linear-gradient(135deg, #cd7f32, #e6a85c);
    color: var(--dark-bg);
    border-color: #cd7f32;
    box-shadow: 0 0 15px rgba(205, 127, 50, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2);
}

.player-col {
    width: auto;
    font-weight: 600;
}

.player-name-link {
    text-decoration: none;
    color: inherit;
    transition: all 0.3s;
    display: inline-block;
}

.player-name-link:hover .player-name {
    color: var(--secondary-orange);
    text-decoration: underline;
}

.player-name {
    color: var(--text-primary);
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    transition: color 0.3s;
    cursor: pointer;
}

.level-col {
    width: 150px;
    text-align: right;
    font-family: 'Courier New', 'Consolas', monospace;
}

.xp-col {
    width: 180px;
    text-align: right;
    font-family: 'Courier New', 'Consolas', monospace;
}

.professions-col {
    width: 150px;
    text-align: right;
    font-family: 'Courier New', 'Consolas', monospace;
}

.level-value,
.xp-value,
.professions-value {
    color: var(--secondary-orange);
    font-weight: 700;
    font-size: 1.05rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

@media (max-width: 968px) {
    .leaderboard-controls {
        flex-direction: column;
        align-items: stretch;
    }

    .control-group {
        width: 100%;
    }

    .select-input {
        width: 100%;
    }
}

@media (max-width: 768px) {
    .leaderboard-page {
        padding: 6rem 1rem 2rem;
    }

    .leaderboard-table-wrapper {
        padding: 1rem;
    }

    .leaderboard-table {
        font-size: 0.9rem;
    }

    .leaderboard-table th,
    .leaderboard-table td {
        padding: 0.75rem 0.5rem;
    }

    .rank-badge {
        width: 35px;
        height: 35px;
        line-height: 35px;
        font-size: 0.9rem;
    }
}
</style>
