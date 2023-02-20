import path from 'path'
import fs from 'fs'

/**
 * 获取完整链接
 * @param targetPath
 * @param envDir
 * @returns
 */
export function getFullPath(targetPath: string, envDir: string): string {
    if (!path.isAbsolute(targetPath)) {
        targetPath = path.resolve(envDir, targetPath)
    }

    return targetPath
}

/**
 * 获取源代码
 * @param fullPath
 * @returns
 */
export function getFileContext(fullPath: string): string {
    const existsFile = fullPath && fs.existsSync(fullPath)
    if (!existsFile) {
        throw new Error('[getFileContext]文件不存在！')
    }

    const sourceCode = fs.readFileSync(fullPath, {
        encoding: 'utf-8',
    })

    return sourceCode
}
