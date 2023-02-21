import { createApp, defineAsyncComponent, type AppContext } from "vue"
import exampleRoot from "./exampleRoot.vue"
// docs/node_modules/@panda-jia/vitepress-demo/dist
const fileList = import.meta.glob(["./../../../../**/*.vue", "!**/src/vitepress-demo", "!**/lib", "!**/dist", "!**/System Volume Information"])
const styleFileList = import.meta.glob(["./../../../../**/*.(scss|sass|css|less|styl|stylus)", "!**/src/vitepress-demo", "!**/lib", "!**/dist", "!**/System Volume Information"], {
    query: { inline: true },
})

async function initStyle(styleObj: { style: string; url: string[] }, root: ShadowRoot) {
    const reg = /:root.*?\}/gms
    const rootStyle = [] // :root变量需要提升
    const styleList: HTMLStyleElement[] = []

    const urlList = styleObj.url
    const len = urlList.length

    for (let i = 0; i < len; i++) {
        const item = urlList[i]
        const s = ((await styleFileList[item]()) as any).default

        const up = s.match(reg)

        if (up) {
            rootStyle.push(...up)
        }

        const n = document.createElement("style")
        n.textContent = s // 在这推入的:root无法生效，不特地去除

        styleList.push(n)
    }

    if (styleObj.style) {
        const up = styleObj.style.match(reg)
        if (up) {
            rootStyle.push(...up)
        }

        const n = document.createElement("style")
        n.textContent = styleObj.style
        styleList.push(n)
    }

    if (rootStyle.length) {
        const n = document.createElement("style")
        n.textContent = rootStyle.join("\n")

        document.head.appendChild(n)
    }

    styleList.forEach((s) => root.appendChild(s))
}

export async function initVueDemo(shadowResult: ShadowResult, relativePath: string, mainApp: AppContext, exampleGlobalStyleStr: string) {
    const exampleGlobalStyle = JSON.parse(decodeURIComponent(exampleGlobalStyleStr))
    await initStyle(exampleGlobalStyle, shadowResult.shadowRoot)

    const app = createApp(exampleRoot)
    // 将mainApp的组件注册进内部
    Object.entries(mainApp.components).forEach(([key, comp]) => {
        app.component(key, comp)
    })
    app.component("exampleDemo", defineAsyncComponent(fileList[relativePath] as any))
    app.mount(shadowResult.rootDom)

    return app
}
