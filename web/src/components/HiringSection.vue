<template>
    <section class="section" id="hiring" style="background: rgba(15, 15, 15, 0.5)">
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title">We're Hiring!</h2>
                    <p class="section-subtitle">Join our team and help shape the world of Orbis. We're looking for talented individuals to bring EmberStone to life.</p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="card-grid">
                    <div class="card" v-for="position in positions" :key="position.icon">
                        <div class="card-icon">{{ position.icon }}</div>
                        <h3 class="card-title">{{ position.title }}</h3>
                        <p class="card-text">{{ position.description }}</p>
                    </div>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="coming-soon-box" style="max-width: 900px; margin: 3rem auto">
                    <h3 style="color: var(--primary-orange); margin-bottom: 1rem">Interested in Joining?</h3>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1rem">
                        We're building something special, and we need passionate creators to help us bring the vision of EmberStone to life. Whether you're a builder, writer,
                        developer, or artist, we'd love to hear from you!
                    </p>
                    <div class="cta-group" style="margin-top: 2rem">
                        <a href="https://discord.gg/34kam5sdBm" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Apply Now</a>
                    </div>
                </div>
            </FadeInWrapper>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import FadeInWrapper from './FadeInWrapper.vue'

const positions = ref([
    {
        icon: '🌍',
        title: 'World Designer / Builder',
        description: 'Create stunning landscapes, build immersive structures, and design the diverse biomes of Orbis. Help us craft a world that players will remember.'
    },
    {
        icon: '📖',
        title: 'Lore & Systems Designer',
        description: 'Develop the rich lore of the Emberstone, design game systems, and create engaging narratives that bring the world of Orbis to life.'
    },
    {
        icon: '💻',
        title: 'Plugin Developer',
        description: 'Build custom plugins and systems for Hytale. Help create unique gameplay mechanics, server features, and technical solutions.'
    },
    {
        icon: '🎨',
        title: '3D Asset Artist',
        description: 'Create custom 3D models, textures, and assets for Hytale. Design unique items, structures, and visual elements that enhance the player experience.'
    },
    {
        icon: '🛡️',
        title: 'Moderator / Supporter',
        description: 'Help maintain a positive community environment, assist players, and ensure everyone has a great experience in Orbis. Be the friendly face that guides new adventurers.'
    },
    {
        icon: '💡',
        title: 'Open Application',
        description: 'Have skills or ideas that don\'t fit the listed positions? We\'re always open to passionate individuals who want to contribute to EmberStone. If you have something unique to offer, we\'d love to hear from you!'
    }
])
</script>

<style scoped>
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
</style>
