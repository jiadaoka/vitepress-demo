import type MarkdownIt from 'markdown-it'
import componentTransform from './componentTransform'

function demoTransform(md: MarkdownIt, option: Option = {}) {
    md.use(componentTransform, option)
}

export { componentTransform }
export default demoTransform
