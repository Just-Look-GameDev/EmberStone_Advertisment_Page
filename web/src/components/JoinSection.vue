<template>
    <section
        class="section"
        id="join"
        style="background: linear-gradient(135deg, rgba(255, 106, 0, 0.05), rgba(184, 134, 11, 0.02))"
        itemscope
        itemtype="https://schema.org/JoinAction"
    >
        <div class="container">
            <FadeInWrapper>
                <div class="section-header">
                    <h2 class="section-title" itemprop="name">Join the Adventure</h2>
                    <p class="section-subtitle" style="font-size: 1.3rem; max-width: 900px">
                        The server is <span class="highlight-text">online now</span> in Survival Mode! Join us as we build the foundation for an epic RPG adventure. The world of
                        Orbis awaits. The Emberstone watches. Your survival story begins here.
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="coming-soon-box" style="max-width: 800px; margin: 3rem auto; border-color: rgba(0, 255, 0, 0.3)">
                    <h3 style="color: #4ade80; margin-bottom: 1rem">🟢 Server Online - Survival Mode Active</h3>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 1rem">
                        Join us now for pure survival gameplay! The server is live and ready for players.
                    </p>
                    <p style="font-size: 1rem; color: var(--accent-gold); font-style: italic; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(184, 134, 11, 0.3)">
                        "In Orbis, every stone remembers. Every tree whispers. Every choice echoes. Welcome to a world where survival is only the beginning of your story."
                    </p>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255, 140, 66, 0.2)">
                        <span class="highlight-text">Coming Soon:</span> Full RPG gamemode with quests, classes, and epic progression!
                    </p>
                </div>
            </FadeInWrapper>

            <FadeInWrapper>
                <ServerAddressInput />
            </FadeInWrapper>

            <FadeInWrapper>
                <div class="cta-group" style="margin-top: 3rem">
                    <a href="https://discord.gg/34kam5sdBm" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Join Discord</a>
                </div>
            </FadeInWrapper>

            <p style="text-align: center; color: #666; margin-top: 3rem; font-size: 0.95rem">
                Server: join.emberstone.net | Game: Hytale | Status: <span style="color: #4ade80">Online - Survival Mode</span>
            </p>
        </div>
    </section>
</template>

<script setup>
import FadeInWrapper from './FadeInWrapper.vue'
import ServerAddressInput from './ServerAddressInput.vue'
</script>

<style scoped>
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
</style>
