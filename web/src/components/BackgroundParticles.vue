<template>
    <div>
        <div
            v-for="(particle, index) in particles"
            :key="index"
            class="particle"
            :style="{
                left: particle.left + '%',
                animationDelay: particle.delay + 's',
                animationDuration: particle.duration + 's'
            }"
        ></div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const particles = ref([])

const createParticle = () => {
    return {
        left: Math.random() * 100,
        delay: Math.random() * 20,
        duration: 15 + Math.random() * 15
    }
}

const initializeParticles = () => {
    // Create initial particles
    for (let i = 0; i < 6; i++) {
        particles.value.push(createParticle())
    }
}

let intervalId = null

onMounted(() => {
    initializeParticles()
    
    // Create new particles periodically
    intervalId = setInterval(() => {
        particles.value.push(createParticle())
        // Remove old particles to prevent memory issues
        if (particles.value.length > 20) {
            particles.value.shift()
        }
    }, 4000)
})

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId)
    }
})
</script>

<style scoped>
.particle {
    position: fixed;
    width: 2px;
    height: 2px;
    background: var(--primary-orange);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0.4;
    animation: float-particle 20s infinite;
    box-shadow: 0 0 6px var(--primary-orange);
}

@keyframes float-particle {
    0% {
        transform: translateY(100vh) translateX(0) scale(0);
        opacity: 0;
    }
    10% {
        opacity: 0.4;
    }
    90% {
        opacity: 0.4;
    }
    100% {
        transform: translateY(-100vh) translateX(100px) scale(1);
        opacity: 0;
    }
}
</style>
