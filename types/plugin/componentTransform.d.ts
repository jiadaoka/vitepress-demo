import type MarkdownIt from "markdown-it";
interface Option {
    componentName?: string;
    style?: string | string[];
    cssUrl?: string | string[];
}
declare function jiaDemoConfig(md: MarkdownIt, option?: Option): void;
export default jiaDemoConfig;
