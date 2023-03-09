import { resolve } from 'path'
import { normalizePath } from 'vite'
const getResolvePath = (root: string, file: string) => normalizePath(resolve(root, `.vitepress`, file))

export function handleStyle(option: Option, cwd: string) {
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
