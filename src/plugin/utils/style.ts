import type { pluginOption, StyleSet } from '../../declare/plugin'
import { resolve, isAbsolute } from 'path'
import { normalizePath } from 'vite'
const getResolvePath = (root: string, file: string) => {
    let p = file
    if (!isAbsolute(p)) {
        const reg = /^\.{1,2}/
        if (reg.test(p)) {
            p = resolve(root, `.vitepress`, file)
        } else {
            p = resolve(root, `node_modules`, file)
        }
    }
    return normalizePath(p)
}

export function handleStyle(option: pluginOption, cwd: string) {
    const obj: StyleSet = {
        style: '',
        import: [],
    }

    if (Array.isArray(option.style)) {
        obj.style = option.style.join('\n')
    } else if (typeof option.style === 'string') {
        obj.style = option.style
    }

    if (Array.isArray(option.cssUrl)) {
        obj.import = option.cssUrl.map((url) => {
            // 获取文件绝对位置
            return `import('${getResolvePath(cwd, url)}?inline')`
        })
    } else if (typeof option.cssUrl === 'string') {
        obj.import = [`import('${getResolvePath(cwd, option.cssUrl)}?inline')`]
    }

    return obj
}
