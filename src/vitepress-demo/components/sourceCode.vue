<template>
    <transition name="jia-vitepress-demo__transition" v-on="transition">
        <div v-show="props.visible" class="source-code-box">
            <div class="source-code" v-html="decodeCode"></div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { computed, type RendererElement } from 'vue'
interface Props {
    visible: boolean
    sourceCode: string
}

const props = defineProps<Props>()

const transition = {
    beforeEnter(el: RendererElement) {
        el.style.maxHeight = 0
    },

    enter(el: RendererElement) {
        if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`
        } else {
            el.style.maxHeight = 0
        }
    },

    afterEnter(el: RendererElement) {
        el.style.maxHeight = ''
    },

    beforeLeave(el: RendererElement) {
        el.style.maxHeight = `${el.scrollHeight}px`
    },

    leave(el: RendererElement) {
        el.style.maxHeight = 0
    },

    afterLeave(el: RendererElement) {
        el.style.maxHeight = ''
    },
}

const decodeCode = computed(() => {
    return decodeURIComponent(props.sourceCode)
})
</script>
