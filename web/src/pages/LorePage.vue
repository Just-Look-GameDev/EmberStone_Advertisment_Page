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
const totalPages = 8

const pages = ref([
    {
        left: `
            <p class="book-title">🔥 EMBERSTONE</p>
            <p class="book-subtitle">Fragments from a World That Learned to Continue</p>
            <p class="book-subtitle">From the Ash Codex</p>
            <p class="book-subtitle" style="margin-top: 2rem;">Tempered Canon</p>
        `,
        right: `
            <p class="fragment-title">Fragment I — Origin</p>
            <p class="quote">"Fire does not destroy.<br />Fire reveals what endures."</p>
            <p>Before the world had a name, it existed as heat without direction.</p>
            <p>Not flame. Not light.</p>
            <p>But pressure — a need to become something else.</p>
            <p>When the Emberstone awakened, it did not speak.</p>
            <p>It strained.</p>
            <p>From that strain came land.</p>
            <p>From land came breath.</p>
            <p>From breath came thought.</p>
            <p>The first mountains were not raised — they were cooled.</p>
            <p>The first seas were not poured — they were condensed.</p>
            <p>The first sky was not lifted — it was released.</p>
            <p>At the world's heart burned the Emberstone Prime: unseen, unheard, endlessly burning.</p>
            <p>It demanded no worship.</p>
            <p>It guided no hands.</p>
            <p class="emphasis">It waited.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment II — On the Nature of Flame</p>
            <p>The Forgeborn did not discover the Emberstone.</p>
            <p>They discovered that fire remembers.</p>
            <p>Metal forged under sustained heat carried echoes — pressure, intent, resistance.</p>
            <p>Blades struck true not because they were sharp, but because they insisted.</p>
            <p>Armor endured not because it was strong, but because it refused to fail.</p>
            <p>The Forgeborn learned to bind memory into matter.</p>
            <p>Cities became stories.</p>
            <p>Weapons became arguments.</p>
            <p>Architecture became belief.</p>
            <p class="emphasis">Belief, repeated long enough, hardened into doctrine.</p>
        `,
        right: `
            <p class="fragment-title">Fragment III — The First Cities</p>
            <p>The earliest cities were not built upward.</p>
            <p>They were carved by restraint.</p>
            <p>Stone was removed, not stacked.</p>
            <p>Weight was distributed, not elevated.</p>
            <p>Strength came from endurance, not reach.</p>
            <p>Children were taught that height was ambition —</p>
            <p>and depth was understanding.</p>
            <p>Depth was never about direction.</p>
            <p>It was about accepting pressure without breaking.</p>
            <p class="emphasis">Not all foundations were meant to hear.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment IV — The Ember Covenant</p>
            <p>The Covenant did not begin as tyrants.</p>
            <p>They were caretakers.</p>
            <p>Forge-lords regulated ember use.</p>
            <p>Scholars charted safe thresholds.</p>
            <p>Wardens sealed unstable sites and marked them with warnings written in heat-proof script.</p>
            <p>For centuries, it worked.</p>
            <p>The world prospered not through conquest —</p>
            <p>but through maintenance.</p>
            <p>Then came the question no record can answer:</p>
            <p class="quote">"If the Emberstone sustains the world…<br />what sustains the Emberstone?"</p>
            <p>No name remains of the one who first proposed reforging it.</p>
            <p class="emphasis">Only that once conceived, the idea refused to die.</p>
        `,
        right: `
            <p class="fragment-title">Fragment V — Early Reforgings</p>
            <p>The first reforgings were small.</p>
            <p>A forest where decay slowed.</p>
            <p>A city where illness vanished.</p>
            <p>A river that returned what it carried.</p>
            <p>The world did not resist.</p>
            <p>It adapted.</p>
            <p>Encouraged, the Covenant extended ember systems across continents.</p>
            <p>Listening sites became control structures.</p>
            <p>Ember-shards were embedded into living guardians — volunteers who believed eternal service was the highest honor.</p>
            <p>They were called Wardens.</p>
            <p class="emphasis">None were built to question.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment VI — The Great Reforging</p>
            <p>The Great Reforging was meant to be gentle.</p>
            <p>A correction.</p>
            <p>A refinement.</p>
            <p>A final tempering of reality.</p>
            <p>But the Emberstone Prime learned what its handlers did not:</p>
            <p class="quote">Perfection is static.<br />Fire is not.</p>
            <p>When the ritual began, the world trembled — not from force, but from refusal.</p>
            <p>The Emberstone did not explode.</p>
            <p class="emphasis">It tore itself apart.</p>
        `,
        right: `
            <p class="fragment-title">Fragment VII — The Fracture</p>
            <p>There was no single moment of destruction.</p>
            <p>Some regions burned instantly.</p>
            <p>Others froze.</p>
            <p>Others persisted unchanged, unaware they were already dead.</p>
            <p>The sky fractured into layered echoes.</p>
            <p>Cities collapsed, twisted, or hardened into silent shapes of memory.</p>
            <p>The Wardens lost their purpose — but not their commands.</p>
            <p>They continued to guard.</p>
            <p class="emphasis">Forever.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment VIII — The Ashen Veil</p>
            <p>By all measure, the world should have ended.</p>
            <p>Every calculation said it would.</p>
            <p>Instead, something unprecedented occurred.</p>
            <p>As the Emberstone shattered, its fragments did not scatter at random.</p>
            <p>Many embedded themselves into living souls — not by choice, but by proximity, resonance, and refusal to let go.</p>
            <p>Thus formed the Ashen Veil:</p>
            <p>a living lattice of ember-bound souls stabilizing reality simply by existing within it.</p>
            <p>They were not chosen.</p>
            <p>They were not warned.</p>
            <p class="emphasis">They endured.</p>
        `,
        right: `
            <p class="fragment-title">Fragment IX — The Tempering</p>
            <p>The world did not heal.</p>
            <p>It settled.</p>
            <p>Where fragments anchored into land, stability returned.</p>
            <p>Where none remained, ruins hardened into stillness.</p>
            <p>Civilizations collapsed, but life did not end.</p>
            <p>New cities rose atop scars.</p>
            <p>Trade routes formed along stable fault-lines.</p>
            <p>Cultures adapted to a world that had learned its limits.</p>
            <p>The Emberstone Prime was gone.</p>
            <p>In its place remained countless fragments — most inert, some resonant.</p>
            <p>The world became tempered.</p>
            <p>Not perfect.</p>
            <p>Not whole.</p>
            <p class="emphasis">But continuing.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment X — The Emberbound</p>
            <p>Those who resonate with Emberstone fragments are known as the Emberbound.</p>
            <p>They are not heroes by birth.</p>
            <p>They are not chosen by fate.</p>
            <p class="emphasis">They are compatible.</p>
            <p>Fragments bind to those who endure pressure without collapse —</p>
            <p>who act, persist, and return.</p>
            <p>The Emberbound do not reshape the world.</p>
            <p>They do not command reality.</p>
            <p>They stabilize what threatens to unravel.</p>
            <p>Fragments grow through use.</p>
            <p>Memory deepens through trial.</p>
            <p>Resonance strengthens through persistence.</p>
            <p class="emphasis">Fire remembers effort.</p>
        `,
        right: `
            <p class="fragment-title">Fragment XI — Memory Structures</p>
            <p>Not all places stabilized cleanly.</p>
            <p>Some ruins still remember what they were meant to be.</p>
            <p>Some systems repeat their final command endlessly.</p>
            <p>Some Wardens still defend halls long emptied.</p>
            <p>These places draw the Emberbound.</p>
            <p>They are not prisons.</p>
            <p>They are not tombs.</p>
            <p>They are memory structures — truths looping imperfectly.</p>
            <p>They reset not because they are repaired,</p>
            <p>but because the world remembers them incorrectly.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Fragment XII — On Friction</p>
            <p>The world remembers what it was meant to become.</p>
            <p>The Emberbound prevent that memory from resolving.</p>
            <p>Some lands resist them.</p>
            <p>Some structures fracture when approached.</p>
            <p>Some echoes grow hostile, as if stability itself were intrusion.</p>
            <p>Conflict does not arise from desire.</p>
            <p class="emphasis">It arises from resistance.</p>
            <p>The world is no longer certain it wants to finish.</p>
        `,
        right: `
            <p class="fragment-title">Fragment XIII — The Crucible</p>
            <p>The Crucible endured.</p>
            <p>Stone holds warmth.</p>
            <p>Air hums with intent.</p>
            <p>Time hesitates.</p>
            <p>Fragments resonate safely here.</p>
            <p>Pressure aligns instead of clashing.</p>
            <p>The Crucible is not a forge.</p>
            <p>It is not a sanctuary.</p>
            <p>It is where the unfinished world is held.</p>
            <p>From here, fragments are refined.</p>
            <p>From here, continuity is shared.</p>
            <p>From here, the tempered world persists.</p>
        `
    },
    {
        left: `
            <p class="fragment-title">Final Fragment — Untranslated</p>
            <p class="quote">"If the flame is ever reassembled,<br />the world will not return to what it was.</p>
            <p class="quote">It will become<br />what it was always testing itself to be."</p>
            <p>Whether that future is mercy, fire, or silence remains unknown.</p>
            <p class="emphasis">Because the Emberstone no longer decides alone.</p>
            <p class="emphasis" style="text-align: center; font-size: 1.3rem; margin-top: 2rem;">It is watching you.</p>
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
    padding: 2rem 2rem;
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
    line-height: 1.4;
    text-align: justify;
    position: relative;
    z-index: 1;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
}

.book-content :deep(p) {
    margin: 0.5rem 0;
    text-indent: 0;
    letter-spacing: 0.01em;
}

.book-content :deep(.fragment-title) {
    font-size: 1.2rem;
    color: #6b4423;
    font-weight: 700;
    margin: 0.8rem 0 0.8rem;
    text-align: center;
    text-indent: 0;
    border-top: 2px solid rgba(139, 69, 19, 0.4);
    padding-top: 0.8rem;
    margin-top: 0.3rem;
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
    margin: 0.6rem 1rem;
    padding: 0.6rem;
    border-left: 3px solid rgba(139, 69, 19, 0.5);
    background: rgba(139, 69, 19, 0.1);
    text-indent: 0;
    font-size: 0.95rem;
    border-radius: 4px;
    line-height: 1.4;
    box-shadow: inset 0 0 10px rgba(139, 69, 19, 0.05);
    font-weight: 500;
}

.book-content :deep(.emphasis) {
    color: #6b4423;
    font-weight: 700;
    font-style: italic;
}

.book-content :deep(.book-title) {
    font-size: 2.5rem;
    color: #8b4513;
    font-weight: 900;
    text-align: center;
    margin: 2rem 0 1.5rem;
    text-indent: 0;
    font-family: 'Georgia', serif;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    line-height: 1.2;
}

.book-content :deep(.book-subtitle) {
    font-size: 1.1rem;
    color: #6b4423;
    font-weight: 500;
    text-align: center;
    margin: 0.3rem 0;
    text-indent: 0;
    font-family: 'Georgia', serif;
    letter-spacing: 0.05em;
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
