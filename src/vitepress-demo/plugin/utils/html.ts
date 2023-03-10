/**
 * 获取匹配html片段的正则
 * @param tagName
 * @returns
 */
const htmlReg = (tagName: string) => new RegExp(`<${tagName}(>|\\s).*?(<\\/${tagName}>|\\/>)`, 'igs')

/**
 * 将tag名转换为驼峰法
 * @param tagName
 * @returns
 */
const tagNameToCamel = (tagName: string) => tagName.replace(/\-{1}(\w)/g, (match, $1) => $1.toUpperCase())

const tagNameToKebab = (tagName: string) => tagName.replace(/([A-Z])/g, (match, $1) => `-${$1.toLowerCase()}`)

export const handleTagName = (tagName: string) => {
    const isKebab = /-/g.test(tagName)
    let result = [] // [camel,kebab]

    if (isKebab) {
        result = [tagNameToCamel(tagName), tagName]
    } else {
        result = [tagName, tagNameToKebab(tagName)]
    }

    return result
}

/**
 * 获取需要的标签字符串列表
 * @param htmlStr
 * @param tagName
 * @returns
 */
export function getHtmlTag(htmlStr: string, tagName: string): string[] {
    const reg = htmlReg(tagName)
    const match = htmlStr.match(reg)

    return match ?? []
}

/**
 * 获取标签内的属性列表
 * @param htmlStr
 * @param tagName
 * @returns
 */
export function getTagAttrMap(htmlStr: string): Map<string, string> {
    const getFirstTagAttrStringReg = new RegExp(`<[a-zA-Z0-9\\-]+\\s+(.*?)\/?>`, 'is') // 获取左标签
    const attrAndValueList: string[] = htmlStr.match(getFirstTagAttrStringReg)![1].split(/\s+/)
    const map = new Map()

    attrAndValueList.forEach((v) => {
        if (v.includes('=')) {
            const [attr, value] = v.split('=')
            const vLen = value.length
            map.set(attr, value.slice(1, vLen - 1))
        } else if (v !== '') {
            map.set(v, true)
        }
    })

    return map
}
