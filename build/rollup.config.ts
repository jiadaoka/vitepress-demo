import { defineConfig } from "rollup"
import alias from "@rollup/plugin-alias"
import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "rollup-plugin-typescript2"
import vue from "@vitejs/plugin-vue"
import postcss from "rollup-plugin-postcss"
import replace from "@rollup/plugin-replace"
import terser from "@rollup/plugin-terser"

export default defineConfig({
    input: {
        component: "./src/vitepress-demo/components/index.vue",
        plugin: "./src/vitepress-demo/plugin/main.ts",
    },
    external: ["vue", "vite"],
    output: [
        {
            dir: "dist",
            format: "es",
            entryFileNames: (chunk) => `[name].js`,
            globals: {
                vue: "Vue",
                vite: "Vite",
            },
        },
    ],
    plugins: [
        alias(),
        replace({
            preventAssignment: true,
        }),
        nodeResolve(),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        vue(),
        postcss(),
        terser(),
    ],
})
