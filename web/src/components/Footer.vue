<template>
    <footer role="contentinfo">
        <div class="footer-content">
            <div class="footer-links">
                <a href="#about" @click.prevent="scrollToSection('about')">About</a>
                <a href="#features" @click.prevent="scrollToSection('features')">Features</a>
                <a href="#survival" @click.prevent="scrollToSection('survival')">Survival</a>
                <a href="#hiring" @click.prevent="scrollToSection('hiring')">Hiring</a>
                <a href="#join" @click.prevent="scrollToSection('join')">Join</a>
                <router-link to="/impressum">Impressum</router-link>
            </div>
            <p class="footer-text">EmberStone — Hytale Survival Server — <span style="color: #4ade80">Online Now</span> | RPG Mode Coming Soon</p>
            <p class="footer-text" style="margin-top: 0.5rem; font-style: italic">"In Orbis, your story begins where survival ends."</p>
        </div>
    </footer>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const scrollToSection = (sectionId) => {
    // If we're not on the home page, navigate there first
    if (route.path !== '/') {
        router.push('/').then(() => {
            setTimeout(() => {
                const element = document.getElementById(sectionId)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 100)
        })
    } else {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }
}
</script>

<style scoped>
footer {
    background: rgba(15, 15, 15, 0.95);
    border-top: 1px solid var(--border-color);
    padding: 4rem 0 2rem;
    text-align: center;
}

.footer-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
}

.footer-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.footer-links a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s;
}

.footer-links a:hover {
    color: var(--secondary-orange);
}

.footer-text {
    color: #666;
    font-size: 0.9rem;
    margin-top: 2rem;
}
</style>
