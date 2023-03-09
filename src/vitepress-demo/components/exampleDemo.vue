<template>
    <div class="example-box">
        <div class="example" ref="exampleHost"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, type Component, type AsyncComponentLoader } from 'vue'
import { initVueDemo, generateShadowDom } from './initExample'

interface Props {
    exampleDemo: AsyncComponentLoader<Component>
    exampleGlobalStyle: string
    exampleGlobalStyleFile: Promise<any>[]
}

const props = defineProps<Props>()
const exampleHost = ref<Element>()
const { appContext } = getCurrentInstance()!

onMounted(() => {
    const shadowResult = generateShadowDom(exampleHost.value!)
    initVueDemo(shadowResult, props.exampleDemo, appContext, {
        style: props.exampleGlobalStyle,
        import: props.exampleGlobalStyleFile,
    })
})
</script>
