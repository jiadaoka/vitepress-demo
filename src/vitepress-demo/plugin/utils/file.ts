import { isAbsolute, resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { normalizePath } from 'vite'

/**
 * 获取完整链接
 * @param targetPath
 * @param envDir
 * @returns
 */
export function getFullPath(targetPath: string, envDir: string): string {
    if (!isAbsolute(targetPath)) {
        targetPath = resolve(envDir, targetPath)
    }

    return normalizePath(targetPath)
}

/**
 * 获取源代码
 * @param fullPath
 * @returns
 */
export function getFileContext(fullPath: string): string {
    const existsFile = fullPath && existsSync(fullPath)
    if (!existsFile) {
        throw new Error('[getFileContext]文件不存在！')
    }

    const sourceCode = readFileSync(fullPath, {
        encoding: 'utf-8',
    })

    return sourceCode
}
