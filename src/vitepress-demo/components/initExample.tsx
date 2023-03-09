import { createApp, defineAsyncComponent, type AppContext, type Component, type AsyncComponentLoader } from 'vue'
import exampleRoot from './exampleRoot.vue'

/**
 * 创建shadowDom
 * @param host
 * @returns
 */
export function generateShadowDom(host: Element): ShadowResult {
    const shadowRoot = host.attachShadow({ mode: 'closed' })
    const rootDom = document.createElement('div')
    rootDom.id = 'shadowRoot'

    shadowRoot.append(rootDom)
    return { shadowRoot, rootDom }
}

export async function initVueDemo(shadowResult: ShadowResult, component: Component, mainApp: AppContext, styleObj: StyleSet) {
    await initStyle(shadowResult.shadowRoot, styleObj)

    const app = createApp(exampleRoot)
    // 将mainApp的组件注册进内部
    Object.entries(mainApp.components).forEach(([key, comp]) => {
        app.component(key, comp)
    })

    app.component('exampleDemo', defineAsyncComponent((() => component) as AsyncComponentLoader<Component>))
    app.mount(shadowResult.rootDom)

    return app
}

/**
 * 初始化样式
 * @param root
 * @param styleObj
 */
async function initStyle(root: ShadowRoot, styleObj: StyleSet) {
    // :root变量需要提升
    const reg = /:root.*?\}/gms
    const rootStyle = []

    const styleList: HTMLStyleElement[] = []

    const styleStr = JSON.parse(decodeURIComponent(styleObj.style))

    if (styleStr) {
        const up = styleStr.match(reg)
        if (up) {
            rootStyle.push(...up)
        }

        const n = document.createElement('style')
        n.textContent = styleStr
        styleList.push(n)
    }

    const len = styleObj.import.length
    for (let i = 0; i < len; i++) {
        const item = ((await styleObj.import[i]) as any).default

        const up = item.match(reg)

        if (up) {
            rootStyle.push(...up)
        }

        const n = document.createElement('style')
        n.textContent = item // 在这推入的:root无法生效，不特地去除
        styleList.push(n)
    }

    if (rootStyle.length) {
        const n = document.createElement('style')
        n.textContent = rootStyle.join('\n')
        document.head.appendChild(n)
    }

    styleList.forEach((s) => root.appendChild(s))
}
