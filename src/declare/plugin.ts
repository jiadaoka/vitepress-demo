export * from './common'

interface gitConfig {
    git: string
    branch: string
}

export declare interface pluginOption {
    componentName?: string
    style?: string | string[]
    cssUrl?: string | string[]
    git?: gitConfig | false
}
