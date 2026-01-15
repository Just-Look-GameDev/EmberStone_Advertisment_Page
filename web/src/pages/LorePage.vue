<template>
    <div class="background-gradient"></div>
    <BackgroundParticles />
    <Navigation />
    
    <div class="lore-page">
        <div class="book-wrapper">
            <div class="book-container">
                <div class="book-pages-container">
                    <div
                        v-for="(page, index) in pages"
                        :key="index"
                        class="book-page-spread"
                        :class="{ active: currentPage === index }"
                        :data-page="index"
                    >
                        <div class="book-page left">
                            <div class="book-content" v-html="page.left"></div>
                        </div>
                        <div class="book-binding"></div>
                        <div class="book-page right">
                            <div class="book-content" v-html="page.right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="book-navigation">
                <button class="page-btn" @click="prevPage" :disabled="currentPage === 0">← Previous</button>
                <span class="page-number">Page {{ currentPage + 1 }} of {{ totalPages }}</span>
                <button class="page-btn" @click="nextPage" :disabled="currentPage === totalPages - 1">Next →</button>
            </div>
        </div>
    </div>
    
    <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navigation from '../components/Navigation.vue'
import BackgroundParticles from '../components/BackgroundParticles.vue'
import Footer from '../components/Footer.vue'

const currentPage = ref(0)
const totalPages = 6

const pages = ref([
    {
        left: `
            <p class="fragment-title">Fragment I — The Birth of Orbis</p>
            <p class="quote">"Before the first stone was laid,<br />before the first tree grew,<br />there was only the Emberstone."</p>
            <p>In the beginning, Orbis was formless. Not empty, but unshaped. A realm of potential waiting for direction.</p>
            <p>When the Emberstone awakened, it did not create—it remembered. It remembered what a world should be, and from that memory, Orbis took form.</p>
            <p>The first biomes were not built—they were dreamed. The first creatures were not made—they were imagined into being. The first magic was not cast—it simply was.</p>
            <p>The Emberstone remained at the world's heart, unseen by most, but felt by all. It did not demand worship. It did not guide hands.</p>
            <p class="emphasis">It simply remembered, and in remembering, it sustained.</p>
        `,
        right: `
            <p class="fragment-title">Fragment II — The First Settlers</p>
            <p>The first mortals to arrive in Orbis did not discover it—they were invited.</p>
            <p>Drawn by whispers on the wind, by dreams of a land where magic flowed like water, they came from realms beyond understanding.</p>
            <p>They found a world already rich with life, already shaped by forces they could not comprehend. But they adapted. They learned.</p>
            <p>They discovered that in Orbis, intention shapes reality. That building was not just construction—it was conversation with the world itself.</p>
            <p>And so the first settlements rose, not as conquest, but as collaboration. The Emberstone watched, and it remembered their names.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment III — The Age of Discovery</p>
            <p>As mortals spread across Orbis, they discovered that the world was far vaster than they imagined.</p>
            <p>Each biome held its own secrets. Each zone whispered different stories. The forests remembered different things than the deserts. The mountains spoke in different tongues than the oceans.</p>
            <p>Explorers became cartographers. Cartographers became scholars. Scholars became keepers of knowledge.</p>
            <p>They learned that Orbis was not static. That the world itself was alive, growing, changing, remembering.</p>
            <p>And they learned that the Emberstone was not a thing, but a process. A constant act of remembering that kept the world whole.</p>
        `,
        right: `
            <p class="fragment-title">Fragment IV — The Great Fracture</p>
            <p>Then came the day when someone asked a question that should never have been asked:</p>
            <p class="quote">"If the Emberstone remembers everything...<br />what happens when it forgets?"</p>
            <p>They tried to force an answer. They built machines to extract memory. They created rituals to command forgetting.</p>
            <p>They did not understand that memory cannot be commanded. That forgetting cannot be forced.</p>
            <p>When they tried, the Emberstone did not break. It fractured. And in fracturing, it remembered something new: what it meant to be incomplete.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment V — The Scattered Shards</p>
            <p>When the Emberstone fractured, it did not shatter into pieces. It scattered into echoes.</p>
            <p>Some echoes embedded themselves in places—ancient ruins that remembered too much. Some embedded themselves in creatures—beasts that carried fragments of memory in their bones.</p>
            <p>Most embedded themselves in mortals—those who were present, those who were listening, those who refused to forget.</p>
            <p>These mortals became the Emberbound. Not chosen, not blessed, but marked by proximity to a moment of cosmic significance.</p>
            <p>They did not gain power. They gained responsibility. The responsibility to remember what the Emberstone could not.</p>
        `,
        right: `
            <p class="fragment-title">Fragment VI — The World Remembers</p>
            <p>Orbis did not collapse. It adapted.</p>
            <p>Where the Emberstone's memory faltered, the world itself began to remember. Trees grew where memories were strong. Ruins formed where stories were incomplete.</p>
            <p>Dungeons appeared not as places, but as questions. Each corridor asked: "What happened here?" Each chamber whispered: "Who forgot this?"</p>
            <p>The creatures of Orbis began to change. Some became guardians of forgotten knowledge. Others became seekers of lost memories.</p>
            <p>And the Emberbound? They became bridges. Living connections between what was remembered and what was forgotten.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment VII — The Age of Survival</p>
            <p>In the wake of the Fracture, survival became more than staying alive. It became an act of remembrance.</p>
            <p>Those who built homes were not just creating shelter—they were anchoring memories to places. Those who crafted tools were not just making objects—they were giving form to forgotten knowledge.</p>
            <p>Every structure built, every resource gathered, every alliance forged became part of Orbis's living memory.</p>
            <p>The Emberbound learned that they were not separate from the world. They were extensions of it. Their survival was the world's survival. Their memory was the Emberstone's memory.</p>
        `,
        right: `
            <p class="fragment-title">Fragment VIII — On Dungeons and Ruins</p>
            <p>The dungeons of Orbis are not places of death. They are places of forgetting.</p>
            <p>Where memory failed, reality became unstable. Corridors loop because time forgot how to flow forward. Traps exist because the world forgot how to be safe.</p>
            <p>Those who explore these places are not adventurers—they are rememberers. Each cleared room restores a fragment of memory. Each defeated guardian releases a forgotten story.</p>
            <p>And those who build near these places? They anchor stability. They give the world something new to remember, something to hold onto when old memories fade.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment IX — The Emberbound Today</p>
            <p>The Emberbound of today are not chosen heroes. They are survivors who happened to be in the right place at the wrong time.</p>
            <p>They feel the world differently. They sense where memory is strong and where it is weak. They know, without knowing how they know, which places are safe and which are unstable.</p>
            <p>Their gear does not obey them—it recognizes them. Their builds do not just stand—they remember. Their communities do not just exist—they anchor reality.</p>
            <p>Every Emberbound adds their own memory to Orbis. Every structure they build, every resource they gather, every story they tell becomes part of the world's living history.</p>
        `,
        right: `
            <p class="fragment-title">Fragment X — The Future of Orbis</p>
            <p>What happens next is not written. It is remembered, and it is built.</p>
            <p>The Emberstone watches, but it no longer decides alone. Every Emberbound who survives, who builds, who remembers adds weight to the world's decision.</p>
            <p>Will the fragments reunite? Will the world remember what it forgot? Will the Emberbound become the new memory keepers of Orbis?</p>
            <p>These questions have no answers yet. Only possibilities. And possibilities are built, not discovered.</p>
            <p class="emphasis">The future of Orbis is in your hands, Emberbound. Build wisely. Remember well.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Final Fragment — A Message to the Emberbound</p>
            <p class="quote">"In Orbis, every stone remembers.<br />Every tree whispers.<br />Every choice echoes.<br /><br />Welcome to a world where survival is only the beginning of your story."</p>
            <p>You are not here by accident. You are here because the world needs you to remember.</p>
            <p>Build your home. Gather your resources. Forge your alliances. But remember: every action becomes part of Orbis's memory.</p>
            <p>The Emberstone watches. The world remembers. And you, Emberbound, are the bridge between what was forgotten and what will be remembered.</p>
            <p class="emphasis" style="text-align: center; font-size: 1.3rem; margin-top: 2rem">Your story begins now.</p>
        `,
        right: ''
    }
])

const prevPage = () => {
    if (currentPage.value > 0) {
        currentPage.value--
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages - 1) {
        currentPage.value++
    }
}

const handleKeydown = (e) => {
    if (e.key === 'ArrowLeft' && currentPage.value > 0) {
        prevPage()
    } else if (e.key === 'ArrowRight' && currentPage.value < totalPages - 1) {
        nextPage()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
    window.scrollTo({ top: 0, behavior: 'smooth' })
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.lore-page {
    min-height: calc(100vh - 200px);
    padding: 8rem 2rem 4rem;
    position: relative;
}

.book-wrapper {
    max-width: 1200px;
    width: 100%;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    position: relative;
}

.book-container {
    display: flex;
    background: #3d2f1f;
    border-radius: 0;
    box-shadow: 0 0 0 20px #2a1f15, 0 0 0 22px #1a140f, 0 30px 80px rgba(0, 0, 0, 0.9), inset -5px 0 20px rgba(0, 0, 0, 0.3);
    position: relative;
    max-width: 1000px;
    width: 100%;
    min-height: 700px;
}

.book-binding {
    width: 40px;
    background: linear-gradient(90deg, #1a140f 0%, #2a1f15 50%, #1a140f 100%);
    position: relative;
    flex-shrink: 0;
}

.book-binding::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(139, 69, 19, 0.2) 3px, rgba(139, 69, 19, 0.2) 6px);
}

.book-pages-container {
    display: flex;
    flex: 1;
    background: #f5f0e8;
    position: relative;
    overflow: hidden;
}

.book-page-spread {
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateX(50px);
    transition: opacity 0.5s, transform 0.5s;
    pointer-events: none;
}

.book-page-spread.active {
    opacity: 1;
    transform: translateX(0);
    pointer-events: all;
    position: relative;
}

.book-page {
    flex: 1;
    padding: 2.5rem 2.5rem;
    background: #faf8f3;
    position: relative;
    min-height: 700px;
    overflow-y: auto;
    max-height: 700px;
}

.book-page.left {
    border-right: 2px solid #e8e0d0;
    box-shadow: inset -5px 0 10px rgba(0, 0, 0, 0.1);
}

.book-page.right {
    border-left: 1px solid #e8e0d0;
    box-shadow: inset 5px 0 10px rgba(0, 0, 0, 0.1);
}

.book-navigation {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    z-index: 100;
}

.page-btn {
    background: rgba(255, 140, 66, 0.9);
    border: 2px solid rgba(255, 106, 0, 0.6);
    color: #0f0f0f;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
    font-size: 0.95rem;
    font-family: 'Georgia', serif;
    box-shadow: 0 4px 15px rgba(255, 106, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.page-btn:hover:not(:disabled) {
    background: rgba(255, 106, 0, 1);
    border-color: rgba(255, 140, 66, 1);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 106, 0, 0.5);
}

.page-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: rgba(139, 69, 19, 0.5);
    color: #888;
}

.page-number {
    color: #ff8c42;
    font-weight: 600;
    min-width: 120px;
    text-align: center;
    font-size: 0.95rem;
    font-family: 'Georgia', serif;
    padding: 0.6rem 1.2rem;
    background: rgba(255, 140, 66, 0.15);
    border: 1px solid rgba(255, 140, 66, 0.4);
    border-radius: 6px;
}

.book-page::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139, 69, 19, 0.03) 24px, rgba(139, 69, 19, 0.03) 25px),
        radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(184, 134, 11, 0.03) 0%, transparent 50%);
    pointer-events: none;
}

.book-content {
    color: #2a1f15;
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: 0.9rem;
    line-height: 1.7;
    text-align: justify;
    position: relative;
    z-index: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
}

.book-content :deep(p) {
    margin: 1rem 0;
    text-indent: 0;
    letter-spacing: 0.01em;
}

.book-content :deep(.fragment-title) {
    font-size: 1.2rem;
    color: #6b4423;
    font-weight: 700;
    margin: 0 0 1.5rem;
    text-align: center;
    text-indent: 0;
    border-top: 2px solid rgba(139, 69, 19, 0.4);
    padding-top: 1.5rem;
    margin-top: 0.5rem;
    font-family: 'Georgia', serif;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

.book-content :deep(.fragment-title:first-of-type) {
    border-top: none;
    padding-top: 0;
    margin-top: 0;
}

.book-content :deep(.quote) {
    font-style: italic;
    color: #6b4423;
    text-align: center;
    margin: 1.2rem 1rem;
    padding: 1rem;
    border-left: 3px solid rgba(139, 69, 19, 0.5);
    background: rgba(139, 69, 19, 0.1);
    text-indent: 0;
    font-size: 0.95rem;
    border-radius: 4px;
    line-height: 1.6;
    box-shadow: inset 0 0 10px rgba(139, 69, 19, 0.05);
    font-weight: 500;
}

.book-content :deep(.emphasis) {
    color: #6b4423;
    font-weight: 700;
    font-style: italic;
}

@media (max-width: 968px) {
    .book-container {
        flex-direction: column;
    }

    .book-binding {
        width: 100%;
        height: 20px;
    }

    .book-binding::before {
        background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139, 69, 19, 0.2) 3px, rgba(139, 69, 19, 0.2) 6px);
    }

    .book-page-spread {
        flex-direction: column;
    }

    .book-page.left {
        border-right: none;
        border-bottom: 2px solid #e8e0d0;
    }

    .book-page.right {
        border-left: none;
    }
}

@media (max-width: 768px) {
    .lore-page {
        padding: 6rem 1rem 2rem;
    }

    .book-wrapper {
        padding: 1rem;
    }

    .book-page {
        padding: 2rem 1.5rem;
    }
}
</style>
