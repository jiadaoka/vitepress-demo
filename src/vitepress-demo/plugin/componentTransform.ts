import type MarkdownIt from 'markdown-it'
import { dirname } from 'path'
import { getHtmlTag, getTagAttrMap, getFullPath, getFileContext, handleStyle, handleTagName } from './utils/index'

const cwd = process.cwd()

function handleComponent(md: MarkdownIt, option: Option = {}) {
    const render = md.render
    const defaultHtmlInlineRender = md.renderer.rules.html_inline!

    let camelComponentName = 'demo'
    let kebabComponentName = ''

    if (option.componentName) {
        const names = handleTagName(option.componentName)
        camelComponentName = names[0]

        if (names[0] !== names[1]) kebabComponentName = names[1]
    }

    const styleObj = handleStyle(option, cwd)

    md.renderer.rules.html_inline = (tokens, idx, options, env, self) => {
        const token = tokens[idx]

        let context = token.content
        let matchHtml: string[] = []
        if (context) {
            matchHtml = getHtmlTag(context, camelComponentName)

            if (kebabComponentName) matchHtml.push(...getHtmlTag(context, kebabComponentName))
        }

        if (matchHtml.length) {
            const len = matchHtml.length
            const envDir = dirname(env.path)

            for (let i = 0; i < len; i++) {
                const demo = matchHtml[i]
                const attrMap = getTagAttrMap(demo)

                if (attrMap.has(':path')) {
                    throw new Error('[jiaDemoConfig -> md.render]path不可为响应式入参')
                } else if (!attrMap.has('path')) {
                    throw new Error('[jiaDemoConfig -> md.render]path为空')
                }

                const attrPath: string = attrMap.get('path')!
                const fullPath = getFullPath(attrPath, envDir)

                // 获取文件内容
                const fileContext = getFileContext(fullPath)

                const sourceCode = render('```vue\n' + fileContext + '\n```', env)

                const endReg = new RegExp(`(\\/?>)`)

                const appendAttr = [
                    ['__source-code', encodeURIComponent(sourceCode)],
                    ['__example-code', encodeURIComponent(fileContext)],
                    ['__full-path', fullPath],
                    [':__example-demo', `import('${fullPath}')`],
                    ['__example-global-style', encodeURIComponent(JSON.stringify(styleObj.style))],
                    [':__example-global-style-file', `[${styleObj.import.join(',')}]`],
                ]

                const replaceDemo = demo.replace(endReg, (m) => {
                    const append = appendAttr.reduce((str, [key, value]) => {
                        str += ` ${key}="${value}"`
                        return str
                    }, '')
                    return `${append} ${m}`
                })

                context = context.replace(demo, replaceDemo)
            }

            return context
        }

        return defaultHtmlInlineRender(tokens, idx, options, env, self)
    }
}

export default handleComponent
