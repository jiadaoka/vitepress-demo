<template>
    <ClientOnly>
        <div class="jia-vitepress-demo">
            <exampleDemo :example-demo="props.__exampleDemo" :example-global-style="props.__exampleGlobalStyle" :example-global-style-file="props.__exampleGlobalStyleFile" />
            <sourceCode :visible="visibleCode" :source-code="props.__sourceCode" />
            <div class="fold-btn" @click="clickFoldColor">
                <span>{{ foldText }}</span>
            </div>
        </div>
    </ClientOnly>
</template>

<script setup lang="ts">
import { ref, computed, type Component, type AsyncComponentLoader } from 'vue'

import exampleDemo from './exampleDemo.vue'
import sourceCode from './sourceCode.vue'
interface Props {
    path: string
    __sourceCode: string
    __exampleCode: string
    __fullPath: string
    __exampleDemo: AsyncComponentLoader<Component>
    __exampleGlobalStyle: string
    __exampleGlobalStyleFile: Promise<any>[]
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
