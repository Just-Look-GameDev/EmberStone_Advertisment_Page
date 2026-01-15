<template>
    <nav role="navigation" aria-label="Main navigation">
        <div class="nav-container">
            <router-link to="/" class="nav-brand" @click="scrollToTop">
                <img src="/logo.png" alt="EmberStone Hytale Server Logo" class="nav-logo" width="50" height="50" />
                <span class="nav-title">EmberStone</span>
            </router-link>
            <ul class="nav-links">
                <li><a href="#about" @click.prevent="scrollToSection('about')">About</a></li>
                <li><a href="#features" @click.prevent="scrollToSection('features')">Features</a></li>
                <li><a href="#survival" @click.prevent="scrollToSection('survival')">Survival</a></li>
                <li><a href="#hiring" @click.prevent="scrollToSection('hiring')">Hiring</a></li>
                <li><a href="#join" @click.prevent="scrollToSection('join')">Join</a></li>
                <li><router-link to="/blog">Blog</router-link></li>
                <li><a href="#" @click.prevent="openLore" class="lore-link">📖 Lore</a></li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const emit = defineEmits(['open-lore'])
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

const scrollToTop = () => {
    if (route.path !== '/') {
        router.push('/')
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

const openLore = () => {
    emit('open-lore')
}
</script>

<style scoped>
nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(15, 15, 15, 0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border-color);
    z-index: 1000;
    padding: 1.5rem 0;
}

.nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
}

.nav-brand:hover .nav-title {
    color: var(--secondary-orange);
}

.nav-logo {
    height: 50px;
    width: auto;
}

.nav-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-secondary);
    letter-spacing: 0.02em;
    transition: color 0.3s;
}

.nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
}

.nav-links a,
.nav-links router-link {
    color: var(--text-secondary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;
    font-size: 0.95rem;
}

.nav-links a:hover,
.nav-links router-link:hover {
    color: var(--secondary-orange);
}

.nav-brand {
    color: inherit;
    text-decoration: none;
}

.lore-link {
    color: var(--accent-gold) !important;
    font-weight: 600;
}

@media (max-width: 968px) {
    .nav-links {
        display: none;
    }
}
</style>
