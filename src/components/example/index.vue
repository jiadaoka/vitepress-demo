<template>
    <ClientOnly>
        <div class="jia-vitepress-demo">
            <exampleDemo :example-demo="props.exampleDemo" :example-global-style="props.exampleGlobalStyle" :example-global-style-file="props.exampleGlobalStyleFile" />
            <sourceCode :visible="visibleCode" :source-code="props.sourceCode" />
            <div class="fold-btn" @click="clickFoldColor">
                <span>{{ foldText }}</span>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import type { Component, AsyncComponentLoader } from 'vue'
import { ref, computed } from 'vue'

import exampleDemo from './exampleDemo.vue'
import sourceCode from './sourceCode.vue'
interface Props {
    name: string
    path: string
    sourceCode: string
    exampleCode: string
    fullPath: string
    exampleDemo: AsyncComponentLoader<Component>
    exampleGlobalStyle: string
    exampleGlobalStyleFile: Promise<any>[]
}

const props = defineProps<Props>()

let visibleCode = ref(false)

const foldText = computed(() => {
    return visibleCode.value ? '收起代码' : '展开代码'
})

function clickFoldColor() {
    visibleCode.value = !visibleCode.value
}
</script>

<style lang="scss">
@use './demo';
</style>
