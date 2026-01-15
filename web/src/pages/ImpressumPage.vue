<template>
    <div class="background-gradient"></div>
    <Navigation @open-lore="openLoreModal" />
    <ImpressumSection />
    <Footer />
    <LoreModal :is-open="isLoreOpen" @close="closeLoreModal" />
</template>

<script setup>
import { ref } from 'vue'
import Navigation from '../components/Navigation.vue'
import ImpressumSection from '../components/ImpressumSection.vue'
import Footer from '../components/Footer.vue'
import LoreModal from '../components/LoreModal.vue'

const isLoreOpen = ref(false)

const openLoreModal = () => {
    isLoreOpen.value = true
}

const closeLoreModal = () => {
    isLoreOpen.value = false
}
</script>
