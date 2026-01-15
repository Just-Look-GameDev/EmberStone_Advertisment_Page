<template>
    <div id="top"></div>
    <div class="background-gradient"></div>

    <BackgroundParticles />
    <Navigation @open-lore="openLoreModal" />
    <HeroSection />
    
    <div class="container">
        <FadeInWrapper>
            <div class="image-showcase">
                <img src="/hero.jpg" alt="EmberStone Hytale Survival Server - Orbis World Landscape" loading="lazy" width="1400" height="600" />
            </div>
        </FadeInWrapper>
    </div>

    <AboutSection />
    <FeaturesSection />
    <SurvivalSection />
    <StatsSection />
    <HiringSection />
    <JoinSection />
    <Footer />

    <LoreModal :is-open="isLoreOpen" @close="closeLoreModal" />
</template>

<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import BackgroundParticles from '../components/BackgroundParticles.vue'
import HeroSection from '../components/HeroSection.vue'
import AboutSection from '../components/AboutSection.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import SurvivalSection from '../components/SurvivalSection.vue'
import StatsSection from '../components/StatsSection.vue'
import HiringSection from '../components/HiringSection.vue'
import JoinSection from '../components/JoinSection.vue'
import Footer from '../components/Footer.vue'
import LoreModal from '../components/LoreModal.vue'
import FadeInWrapper from '../components/FadeInWrapper.vue'

const isLoreOpen = ref(false)

const openLoreModal = () => {
    isLoreOpen.value = true
}

const closeLoreModal = () => {
    isLoreOpen.value = false
}
</script>
