<template>
    <ClientOnly>
        <div class="jia-vitepress-demo">
            <exampleDemo :relative-path="props.relativePath" :example-global-style="exampleGlobalStyle" />
            <sourceCode :visible="visibleCode" :source-code="props.sourceCode" />
            <div class="fold-btn" @click="clickFoldColor">
                <span>{{ foldText }}</span>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import exampleDemo from './exampleDemo.vue'
import sourceCode from './sourceCode.vue'
interface Props {
    sourceCode: string
    exampleCode: string
    path: string
    fullPath: string
    envDir: string
    name: string
    relativePath: string
    exampleGlobalStyle: string
}

const props = defineProps<Props>()
let visibleCode = ref(false)

const foldText = computed(() => {
    return visibleCode.value ? '展开代码' : '收起代码'
})

function clickFoldColor() {
    visibleCode.value = !visibleCode.value
}
</script>

<style lang="scss">
@use './demo';
</style>
