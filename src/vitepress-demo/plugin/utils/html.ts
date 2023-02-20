/**
 * 获取需要的标签字符串列表
 * @param htmlStr
 * @param tagName
 * @returns
 */
export function getHtmlTag(htmlStr: string, tagName: string): string[] {
    const reg = new RegExp(`<${tagName}(>|\\s).*(<\\/${tagName}>|\\/>)`, 'ig')
    const match = htmlStr.match(reg)

    return match ?? []
}

/**
 * 获取标签内的属性列表
 * @param htmlStr
 * @param tagName
 * @returns
 */
export function getTagAttrMap(htmlStr: string, tagName: string): Map<string, string> {
    const getFirstTagAttrStringReg = new RegExp(`<${tagName}(.*?)\/?>`, 'i') // 获取左标签
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
