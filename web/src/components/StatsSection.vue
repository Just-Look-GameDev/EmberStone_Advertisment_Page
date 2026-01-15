<template>
    <section class="section" style="background: rgba(15, 15, 15, 0.5)">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title">Server Features</h2>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="stats-grid">
                    <div class="stat-card" v-for="stat in stats" :key="stat.number" :class="stat.status">
                        <div class="stat-number">{{ stat.number }}</div>
                        <div class="stat-label">{{ stat.label }}</div>
                    </div>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="card-grid" style="margin-top: 3rem">
                    <div class="card" v-for="feature in serverFeatures" :key="feature.icon">
                        <div class="card-icon">{{ feature.icon }}</div>
                        <h3 class="card-title">{{ feature.title }}</h3>
                        <p class="card-text">{{ feature.description }}</p>
                    </div>
                </div>
            </FadeInWrapper>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FadeInWrapper from './FadeInWrapper.vue'

const stats = ref([
    { number: '∞', label: 'Procedural Zones' },
    { number: 'ONLINE', label: 'Server Status', status: 'online' },
    { number: 'SURVIVAL', label: 'Current Mode' },
    { number: 'RPG', label: 'Coming Soon', status: 'coming' }
])

const serverFeatures = ref([
    {
        icon: '🌍',
        title: 'Persistent World',
        description: 'Your builds, your progress, your story—all persist in the world of Orbis. This is your home, your legacy.'
    },
    {
        icon: '📖',
        title: 'Living Story',
        description: 'The lore of the Emberstone unfolds through exploration. Discover ancient ruins, hidden texts, and forgotten secrets.'
    },
    {
        icon: '🎯',
        title: 'Player-Driven',
        description: 'Your actions shape the server. Build communities, create trade routes, and become part of Orbis\'s evolving story.'
    }
])
</script>

<style scoped>
.stat-card.online .stat-number {
    color: #4ade80;
    -webkit-text-fill-color: #4ade80;
}

.stat-card.coming .stat-number {
    color: var(--accent-gold);
    -webkit-text-fill-color: var(--accent-gold);
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: 0.05em;
}

.stat-card:first-child .stat-number {
    font-size: 3.5rem;
    background: linear-gradient(135deg, var(--primary-orange), var(--accent-gold));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>
