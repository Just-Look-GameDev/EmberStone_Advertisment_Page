<template>
    <section class="section" id="survival">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title">Pure Survival Experience</h2>
                    <p class="section-subtitle">
                        Experience Hytale survival in its purest form, enhanced by rich lore and a vibrant community.
                        <span class="highlight-text">Currently live as Survival — evolving into an RPG gamemode in the future!</span>
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="feature-showcase">
                    <div class="image-showcase">
                        <img src="/future gamemode.jpg" alt="Future RPG gamemode preview for EmberStone Hytale survival server" loading="lazy" width="800" height="500" />
                    </div>
                    <div class="feature-content">
                        <h3>What Makes Our Survival Special?</h3>
                        <p>At its core, EmberStone is currently a pure survival server. Gather resources, build shelters, craft tools, and explore the vast world of Orbis.</p>
                        <p>
                            We've woven the ancient lore of the Emberstone throughout your journey. Discover hidden locations, uncover forgotten stories, and feel the weight of
                            history as you build your legacy.
                        </p>
                        <p>
                            <span class="highlight-text">No pay-to-win. No overpowered kits.</span> Just pure survival, enhanced by a world that feels alive and a community that
                            shapes its own destiny.
                        </p>
                        <p style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 140, 66, 0.3)">
                            <span class="highlight-text">Future Plans:</span> The server will evolve into a full RPG-styled gamemode with quests, classes, and deeper progression
                            systems. For now, enjoy the pure survival experience and help shape the world that will become the foundation for our RPG adventure!
                        </p>
                    </div>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="card-grid" style="margin-top: 3rem">
                    <div class="card" v-for="item in survivalFeatures" :key="item.icon">
                        <div class="card-icon">{{ item.icon }}</div>
                        <h3 class="card-title">{{ item.title }}</h3>
                        <p class="card-text">{{ item.description }}</p>
                    </div>
                </div>
            </FadeInWrapper>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FadeInWrapper from './FadeInWrapper.vue'

const survivalFeatures = ref([
    {
        icon: '⛏️',
        title: 'Resource Gathering',
        description: 'Mine deep into Orbis\'s diverse biomes. Each zone offers unique materials and challenges for resource gathering.'
    },
    {
        icon: '🛠️',
        title: 'Crafting System',
        description: 'Master Hytale\'s comprehensive crafting system. Create everything from basic tools to powerful equipment.'
    },
    {
        icon: '🏠',
        title: 'Base Building',
        description: 'Build your home anywhere in Orbis. From simple shelters to grand fortresses, your creativity is the only limit.'
    }
])
</script>

<style scoped>
.feature-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    margin: 4rem 0;
}

.feature-content h3 {
    font-size: 2rem;
    color: var(--secondary-orange);
    margin-bottom: 1.5rem;
}

.feature-content p {
    color: var(--text-secondary);
    line-height: 1.8;
    font-size: 1.1rem;
    margin-bottom: 1rem;
}

.highlight-text {
    color: var(--secondary-orange);
    font-weight: 600;
}

@media (max-width: 968px) {
    .feature-showcase {
        grid-template-columns: 1fr;
    }
}
</style>
