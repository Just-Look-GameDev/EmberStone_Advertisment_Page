<template>
    <section class="hero" itemscope itemtype="https://schema.org/VideoGame">
        <img src="/logo.png" alt="EmberStone - Survival Server evolving into MMORPG Logo" class="hero-logo" itemprop="image" />
        <h1 class="hero-subtitle">
            Survival Server → Evolving into MMORPG
        </h1>
        <p class="hero-tagline" itemprop="description">
            Welcome to Orbis, a world steeped in deep lore where the <span class="highlight-text">Emberbound</span> shape the world and prepare for the future. Currently a survival server, evolving into a full MMORPG with classes, professions, quests, and dungeons—all woven into our rich, immersive storytelling. Join us in building something extraordinary.
        </p>
        <ServerAddressInput label="🟢 Server Online — Join Now" />
        <div class="cta-group">
            <a href="https://discord.gg/34kam5sdBm" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Join Discord</a>
            <a href="#features" @click.prevent="scrollToFeatures" class="btn btn-secondary">Explore Features</a>
        </div>
    </section>
</template>

<script setup>
import ServerAddressInput from './ServerAddressInput.vue'

const scrollToFeatures = () => {
    const element = document.getElementById('features')
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}
</script>

<style scoped>
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 8rem 2rem 4rem;
    position: relative;
}

.hero-logo {
    max-width: 600px;
    width: 100%;
    height: auto;
    margin-bottom: 2rem;
    filter: drop-shadow(0 10px 40px rgba(255, 106, 0, 0.3));
    animation: logo-float 6s ease-in-out infinite;
}

@keyframes logo-float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}

.hero-subtitle {
    font-size: 1.3rem;
    color: var(--accent-gold);
    font-weight: 300;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
}

.hero-tagline {
    font-size: 1.4rem;
    color: var(--text-secondary);
    max-width: 800px;
    margin: 0 auto 3rem;
    font-weight: 300;
    line-height: 1.8;
}

.highlight-text {
    color: var(--secondary-orange);
    font-weight: 600;
}

.cta-group {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
}

.btn {
    padding: 1rem 2.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s;
    font-size: 1rem;
    display: inline-block;
}

.btn-primary {
    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-orange));
    color: white;
    border: none;
}

.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(255, 106, 0, 0.4);
}

.btn-secondary {
    background: transparent;
    color: var(--secondary-orange);
    border: 2px solid var(--border-color);
}

.btn-secondary:hover {
    background: rgba(255, 106, 0, 0.1);
    border-color: var(--primary-orange);
}

@media (max-width: 768px) {
    .hero-logo {
        max-width: 300px;
    }

    .cta-group {
        flex-direction: column;
    }

    .btn {
        width: 100%;
        text-align: center;
    }
}
</style>
