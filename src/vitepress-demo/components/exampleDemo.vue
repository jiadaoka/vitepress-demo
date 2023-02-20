<template>
    <div class="example-box">
        <div class="example" ref="exampleHost"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from 'vue'
import { initVueDemo } from './initExample'

interface Props {
    relativePath: string
    exampleGlobalStyle: string
}

const props = defineProps<Props>()
const exampleHost = ref<Element>()
const { appContext } = getCurrentInstance()!

onMounted(() => {
    const shadowResult = generateShadowDom(exampleHost.value!)
    initVueDemo(shadowResult, props.relativePath, appContext, props.exampleGlobalStyle)
})

function generateShadowDom(host: Element): ShadowResult {
    const shadowRoot = host.attachShadow({ mode: 'closed' })
    const rootDom = document.createElement('div')
    rootDom.id = 'shadowRoot'

    shadowRoot.append(rootDom)
    return { shadowRoot, rootDom }
}
</script>
