<template>
    <section class="section" id="features" style="background: rgba(15, 15, 15, 0.5)" itemscope itemtype="https://schema.org/ItemList">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title" itemprop="name">Survival Server Features</h2>
                    <p class="section-subtitle">
                        Experience Hytale survival like never before in a world rich with lore and adventure.
                        <span class="highlight-text">Currently in Survival Mode — RPG gamemode coming soon!</span>
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="card-grid">
                    <div class="card" v-for="feature in features" :key="feature.icon">
                        <div class="card-icon">{{ feature.icon }}</div>
                        <h3 class="card-title">{{ feature.title }}</h3>
                        <p class="card-text">{{ feature.description }}</p>
                    </div>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="image-showcase" style="margin-top: 3rem">
                    <img src="/boss.jpg" alt="Survival crafting and building gameplay in EmberStone Hytale server" loading="lazy" width="1400" height="600" />
                </div>
            </FadeInWrapper>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FadeInWrapper from './FadeInWrapper.vue'

const features = ref([
    {
        icon: '🌍',
        title: 'Procedural World',
        description: 'Explore the diverse biomes of Orbis. Each zone offers unique resources, challenges, and secrets waiting to be discovered.'
    },
    {
        icon: '🏗️',
        title: 'Building & Crafting',
        description: 'Build your base, craft powerful gear, and create a home that stands the test of time. Your structures become part of Orbis\'s history.'
    },
    {
        icon: '⚔️',
        title: 'Combat & Exploration',
        description: 'Face the creatures of Orbis, explore the diverse biomes, and test your survival skills against the challenges that await in every corner.'
    },
    {
        icon: '🤝',
        title: 'Community Survival',
        description: 'Join forces with other survivors. Form alliances, trade resources, and build communities that thrive together in Orbis.'
    },
    {
        icon: '📜',
        title: 'Living Lore',
        description: 'Discover the story of the Emberstone through exploration. Every discovery adds to your understanding of Orbis\'s ancient past.'
    },
    {
        icon: '🔄',
        title: 'Evolving World',
        description: 'The world of Orbis grows and changes. New content, events, and challenges ensure that every play session brings something new.'
    }
])
</script>

<style scoped>
.highlight-text {
    color: var(--secondary-orange);
    font-weight: 600;
}
</style>
