<template>
    <div ref="element" class="fade-in">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const element = ref(null)

let observer = null

onMounted(() => {
    if (element.value) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible')
                }
            })
        }, observerOptions)

        observer.observe(element.value)
    }
})

onUnmounted(() => {
    if (observer && element.value) {
        observer.unobserve(element.value)
    }
})
</script>

<style scoped>
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s, transform 0.8s;
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
</style>
