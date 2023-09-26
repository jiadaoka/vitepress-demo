import type { App, InjectionKey } from 'vue'

type beforeMount = (app: App, shadowRoot: ShadowRoot, rootDom: Element) => void

const beforeMountSymbol = Symbol('beforeMountSymbol') as InjectionKey<beforeMount>

export { beforeMountSymbol }
