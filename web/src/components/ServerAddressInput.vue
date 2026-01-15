<template>
    <div class="server-address-container">
        <label v-if="label" class="server-address-label">{{ label }}</label>
        <div class="server-address-input-group">
            <input
                type="text"
                class="server-address-input"
                :value="serverAddress"
                readonly
                @click="selectText"
            />
            <button class="copy-btn" :class="{ copied: isCopied }" @click="copyToClipboard">
                <span>{{ isCopied ? '✓' : '📋' }}</span>
                <span>{{ isCopied ? 'Copied!' : 'Copy' }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    label: {
        type: String,
        default: 'Server Address'
    },
    serverAddress: {
        type: String,
        default: 'join.emberstone.net'
    }
})

const isCopied = ref(false)

const selectText = (event) => {
    event.target.select()
}

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(props.serverAddress)
        isCopied.value = true
        setTimeout(() => {
            isCopied.value = false
        }, 2000)
    } catch (err) {
        // Fallback for older browsers
        const input = document.createElement('input')
        input.value = props.serverAddress
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        isCopied.value = true
        setTimeout(() => {
            isCopied.value = false
        }, 2000)
    }
}
</script>

<style scoped>
.server-address-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 0;
}

.server-address-label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
    text-align: center;
    font-weight: 500;
}

.server-address-input-group {
    display: flex;
    align-items: center;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.5rem;
    transition: all 0.3s;
}

.server-address-input-group:hover {
    border-color: rgba(255, 106, 0, 0.4);
    box-shadow: 0 4px 12px rgba(255, 106, 0, 0.1);
}

.server-address-input {
    flex: 1;
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 1.1rem;
    padding: 0.75rem 1rem;
    font-family: 'Courier New', monospace;
    outline: none;
    text-align: center;
}

.server-address-input::selection {
    background: rgba(255, 106, 0, 0.3);
}

.copy-btn {
    background: var(--primary-orange);
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.copy-btn:hover {
    background: var(--secondary-orange);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(255, 106, 0, 0.3);
}

.copy-btn:active {
    transform: translateY(0);
}

.copy-btn.copied {
    background: #4ade80;
}

.copy-btn.copied:hover {
    background: #22c55e;
}

@media (max-width: 768px) {
    .server-address-input-group {
        flex-direction: column;
        gap: 0.75rem;
    }

    .server-address-input {
        width: 100%;
        text-align: center;
    }

    .copy-btn {
        width: 100%;
        justify-content: center;
    }
}
</style>
