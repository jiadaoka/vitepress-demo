export declare const handleTagName: (tagName: string) => string[];
/**
 * 获取需要的标签字符串列表
 * @param htmlStr
 * @param tagName
 * @returns
 */
export declare function getHtmlTag(htmlStr: string, tagName: string): string[];
/**
 * 获取标签内的属性列表
 * @param htmlStr
 * @param tagName
 * @returns
 */
export declare function getTagAttrMap(htmlStr: string): Map<string, string>;
