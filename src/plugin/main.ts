import type { pluginOption } from '../declare/plugin'
import type MarkdownIt from 'markdown-it'
import componentTransform from './componentTransform'

function demoTransform(md: MarkdownIt, option: pluginOption = {}) {
    md.use(componentTransform, option)
}

export { componentTransform }
export default demoTransform
