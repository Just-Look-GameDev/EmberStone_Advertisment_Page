<template>
    <section class="section" id="about" itemscope itemtype="https://schema.org/AboutPage">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title">What is EmberStone?</h2>
                    <p class="section-subtitle">
                        A community-driven development journey: <span class="highlight-text">Survival Server</span> testing features that will power our future <span class="highlight-text">MMORPG</span>. Built on deep, immersive lore that shapes every system and story. Join the Emberbound in shaping Orbis through testing, feedback, and shared adventure.
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="feature-showcase">
                    <div class="feature-content">
                        <h3>Development Journey</h3>
                        <p>
                            <span class="highlight-text">Current Phase:</span> Our survival server is live and playable, where features are developed and refined with community feedback.
                        </p>
                        <p>
                            <span class="highlight-text">Future Vision:</span> A full MMORPG featuring deep progression systems, classes with specializations, professions, quests, dungeons, and zone-based progression—all woven into our rich, immersive lore.
                        </p>
                        <p>
                            The world of Orbis remembers those who endure. Our deep lore isn't just background—it's woven into every system, every quest, every zone. As an <span class="highlight-text">Emberbound</span>, you're not just playing—you're helping build the future of this world and discovering its rich, layered history.
                        </p>
                    </div>
                    <div class="image-showcase">
                        <img src="/Emberbound.jpg" alt="Emberbound players testing features in EmberStone survival server, preparing for future MMO" loading="lazy" width="600" height="400" />
                    </div>
                </div>
            </FadeInWrapper>
        </div>
    </section>
</template>

<script setup>
import FadeInWrapper from './FadeInWrapper.vue'
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
