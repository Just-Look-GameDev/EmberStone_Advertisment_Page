<template>
    <section class="section" id="features" style="background: rgba(15, 15, 15, 0.5)" itemscope itemtype="https://schema.org/ItemList">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title" itemprop="name">MMO Features in Development</h2>
                    <p class="section-subtitle">
                        Features in development, coming to our MMO server.
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="card-grid">
                    <div class="card" v-for="feature in features" :key="feature.icon">
                        <div class="card-icon">{{ feature.icon }}</div>
                        <h3 class="card-title">{{ feature.title }}</h3>
                        <p class="card-text" v-html="feature.description"></p>
                    </div>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="image-showcase" style="margin-top: 3rem">
                    <img src="/boss.jpg" alt="MMO features in development for EmberStone - classes, professions, quests, and dungeons" loading="lazy" width="1400" height="600" />
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
        icon: '⚔️',
        title: 'Classes & Specializations',
        description: 'Multiple classes with specializations. MMO roles deeply integrated with our rich lore and world-building.'
    },
    {
        icon: '🔨',
        title: 'Professions System',
        description: 'Multiple professions including gathering and crafting. Level-based progression, crafting recipes, and profession bonuses.'
    },
    {
        icon: '🗺️',
        title: 'Zone Progression',
        description: 'Attunement, stabilization, and mastery system. Zones progress from Unattuned → Attuned → Stabilized → Mastered. Learn to operate in each region.'
    },
    {
        icon: '📜',
        title: 'Quest System',
        description: 'Main zone questlines, side quests, class quests, and dungeon quests—all driven by our deep lore. Personal progression through the world of Orbis, uncovering its rich history and stories.'
    },
    {
        icon: '🏰',
        title: 'Dungeons & Group Content',
        description: 'MMO dungeons with role-based gameplay, each telling a story from our deep lore. Repeatable content with scalable difficulty. Memory structures that never finished collapsing, rich with narrative depth.'
    },
    {
        icon: '🚀',
        title: 'More Coming Soon',
        description: 'Many more features are in development, and a lot of what we build is shaped by community feedback. Your voice matters—help us create the MMO experience you want to see.'
    }
])
</script>

<style scoped>
.highlight-text {
    color: var(--secondary-orange);
    font-weight: 600;
}

.card-text :deep(.highlight-text) {
    color: var(--secondary-orange);
    font-weight: 600;
}
</style>
