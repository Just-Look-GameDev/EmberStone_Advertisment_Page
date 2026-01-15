<template>
    <section class="section" id="about" itemscope itemtype="https://schema.org/AboutPage">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title">What is EmberStone?</h2>
                    <p class="section-subtitle">
                        A lore-driven Hytale survival server set in the world of Orbis, where ancient powers shape reality itself.
                        <span class="highlight-text">Currently online as Survival Mode — evolving into an RPG gamemode!</span>
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="feature-showcase">
                    <div class="feature-content">
                        <h3>The World of Orbis</h3>
                        <p>
                            In the vast realm of Orbis, where magic flows through every biome and ancient ruins whisper forgotten tales, the
                            <span class="highlight-text">Emberstone</span> stands as a testament to a power that predates memory itself.
                        </p>
                        <p>
                            This is not just another survival server. This is a world where your choices echo through time. Every structure you build, every resource you gather,
                            every alliance you forge becomes part of Orbis's living story.
                        </p>
                        <p>
                            The Emberstone watches, listens, and responds. As you explore the diverse zones, from lush forests to treacherous dungeons, you'll discover that
                            survival here means more than staying alive—it means becoming part of something greater.
                        </p>
                    </div>
                    <div class="image-showcase">
                        <img src="/Emberbound.jpg" alt="Player survival base building in EmberStone Hytale server Orbis world" loading="lazy" width="600" height="400" />
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
