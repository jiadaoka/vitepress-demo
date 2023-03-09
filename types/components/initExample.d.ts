import { type AppContext, type Component } from 'vue';
/**
 * 创建shadowDom
 * @param host
 * @returns
 */
export declare function generateShadowDom(host: Element): ShadowResult;
export declare function initVueDemo(shadowResult: ShadowResult, component: Component, mainApp: AppContext, styleObj: StyleSet): Promise<import("vue").App<Element>>;
