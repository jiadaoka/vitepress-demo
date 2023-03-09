interface ShadowResult {
    shadowRoot: ShadowRoot
    rootDom: Element
}

interface Option {
    componentName?: string
    style?: string | string[]
    cssUrl?: string | string[]
}

interface StyleSet {
    style: string
    import: string[] | Promise<any>[]
}

declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
}
