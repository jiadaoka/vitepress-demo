import type MarkdownIt from "markdown-it"
import { dirname, resolve, relative, posix } from "path"
import { normalizePath } from "vite"
import { fileURLToPath } from "url"
import { getHtmlTag, getTagAttrMap, getFullPath, getFileContext } from "./utils/index"

interface Option {
    componentName?: string
    style?: string | string[]
    cssUrl?: string | string[]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getResolvePath = (root: string, file: string) => resolve(root, `.vitepress`, file)
const getGlobPath = resolve(__dirname, "../components/") // 调用import.meta.glob的文件

function handleStyle(option: Option) {
    const obj: {
        style: string
        url: string[]
    } = {
        style: "",
        url: [],
    }

    if (Array.isArray(option.style)) {
        obj.style = option.style.join("\n")
    } else if (typeof option.style === "string") {
        obj.style = option.style
    }

    if (Array.isArray(option.cssUrl)) {
        obj.url = option.cssUrl.map((url) => {
            return normalizePath(relative(getGlobPath, getResolvePath(process.cwd(), url)))
        })
    } else if (typeof option.cssUrl === "string") {
        obj.url = [normalizePath(relative(getGlobPath, getResolvePath(process.cwd(), option.cssUrl)))]
    }

    return obj
}

function jiaDemoConfig(md: MarkdownIt, option: Option = {}) {
    const render = md.render
    const componentName = option.componentName ?? "demo"
    const styleObj = handleStyle(option)

    md.render = (src, env) => {
        let htmlStr: string = render.call(md, src, env)
        const demoList = getHtmlTag(src, componentName)

        const len = demoList.length
        const envDir = dirname(env.path)

        for (let i = 0; i < len; i++) {
            const demo = demoList[i]
            const attrMap = getTagAttrMap(demo, componentName)

            if (attrMap.has(":path")) {
                throw new Error("[jiaDemoConfig -> md.render]path不可为响应式入参")
            } else if (!attrMap.has("path")) {
                throw new Error("[jiaDemoConfig -> md.render]path为空")
            }

            const attrPath = attrMap.get("path")

            const fullPath = getFullPath(attrPath!, envDir)
            const fileContext = getFileContext(fullPath)

            // 交回vitepress结构化代码块
            const sourceCode = render("```vue\n" + fileContext + "\n```", env)
            const demoDir = dirname(fullPath)
            const fileName = posix.basename(fullPath)
            const relativePath = normalizePath(relative(getGlobPath, fullPath)) // 获取glob使用的相对路径

            const endReg = new RegExp(`(\\/?>)`)
            const appendAttr = [
                ["source-code", encodeURIComponent(sourceCode)],
                ["example-code", encodeURIComponent(fileContext)],
                ["full-path", fullPath],
                ["env-dir", demoDir],
                ["name", fileName],
                ["relative-path", relativePath],
                ["example-global-style", encodeURIComponent(JSON.stringify(styleObj))],
            ]

            const replaceDemo = demo.replace(endReg, (m) => {
                const append = appendAttr.reduce((str, [key, value]) => {
                    str += ` ${key}="${value}"`
                    return str
                }, "")
                return `${append} ${m}`
            })

            htmlStr = htmlStr.replace(demo, replaceDemo)
        }

        return htmlStr
    }
}

export default jiaDemoConfig
