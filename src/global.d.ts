interface ShadowResult {
    shadowRoot: ShadowRoot;
    rootDom: Element;
}

declare module "*.vue" {
    import { ComponentOptions } from "vue";
    const componentOptions: ComponentOptions;
    export default componentOptions;
}
