# @panda-jia/vitepress-demo

@panda-jia/vitepress-demo 基于 shadow DOM 扩充 vitepress 的 DEMO 演示能力，降低编写 DEMO 的难度，简化展示示例的配置。

## 背景

### vitepress DEMO 演示的问题

-   vitepress 演示组件和代码需要各自配置一份。
-   vitepress 的公共样式会影响 DEMO 内部的样式。

### 解决想法

-   通过配置只用一份代码完成组件的 DEMO 演示和代码展示。
-   使用 shadow DOM 自带的特性实现代码样式隔离。

## 安装

```shell
npm install @panda-jia/vitepress-demo
```

## 使用

### Markdown 解析插件

在 .vitepress/config 内注册 Markdown 解析插件

```JavaScript
import { componentTransform } from '@panda-jia/vitepress-demo/plugin'

export default {
    markdown: {
        config(md) {
            md.use(componentTransform,
                // {
                //     componentName: 'demo'
                //     style:  ['.class-name{width:100px}'],
                //     cssUrl: ['../index.scss']
                // }
            )
        },
    },
}
```

### DEMO 组件

在 .vitepress/theme/index 内注册 DEMO 组件

```JavaScript
import DefaultTheme from 'vitepress/theme'
import DemoPreview from '@panda-jia/vitepress-demo/component'

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.component('demo', DemoPreview)
    },
}
```

在 Markdown 文件中使用

```vue
<demo path="../../../src/components/button/index.vue"></demo>
```

### componentTransform 配置

Markdown 插件支持以下入参，示例看上方：

```Typescript
interface Option {
    componentName?: string
    style?: string | string[]
    cssUrl?: string | string[]
}
```

-   `componentName`

    @panda-jia/vitepress-demo 希望将 DEMO 组件注册为 <demo></demo>，但不排除注册为其它名字的情况，这时需要将注册名传入插件。

-   `style`

    shadow DOM 内部公共样式配置。

-   `cssUrl`

    shadow DOM 内部公共样式配置。

## 已知缺陷

1.  一些 UI 库的组件对 shadow DOM 没做 UI 适配，会出现组件无法正常使用的情况。

    不确定是否会处理，这个可以通过让组件适配 shadow DOM 解决。

2.  动态获取组件存在目录过深获取不到的情况。

    import.meta.glob 在 pnpm link 和从 npm 安装包是两个结果。

... 待补充
