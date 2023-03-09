# 已知问题

## 配置问题

1. 声明文件由于采用 exports 分包导致无法正常生效。

    可以向向 global.d.ts 添加以下代码。

```TypeScript
declare module '@panda-jia/vitepress-demo/plugin' {
    import demoTransform, { componentTransform } from '@panda-jia/vitepress-demo/types/plugin/main'
    export default demoTransform
    export { componentTransform }
}

declare module '@panda-jia/vitepress-demo/component' {
    export * from '@panda-jia/vitepress-demo/types/components/index.vue'
}


```

## 思考

1.  一些 UI 库的组件对 shadow DOM 没做 UI 适配，会出现组件无法正常使用的情况。

    不确定是否会处理，这个可以通过让组件适配 shadow DOM 解决。
