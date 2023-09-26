import { defineConfig } from 'rollup'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import postcss from 'rollup-plugin-postcss'
import replace from '@rollup/plugin-replace'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

const input = {
    component: './src/components/index.ts',
    plugin: './src/plugin/main.ts',
}

const external = ['vue', 'vite']

const plugins = [
    replace({
        preventAssignment: true,
    }),
    nodeResolve(),
    commonjs(),
    esbuild(),
    vue(),
    postcss(),
]

const watch = {
    buildDelay: 1000,
}

export default defineConfig([
    {
        input,
        external,
        output: [
            {
                dir: 'dist',
                format: 'es',
                entryFileNames: (chunk) => `[name].js`,
                globals: {
                    vue: 'Vue',
                    vite: 'Vite',
                },
            },
        ],
        plugins: plugins,
        watch,
    },
    {
        input,
        external,
        output: [
            {
                dir: 'dist',
                format: 'es',
                entryFileNames: (chunk) => `[name].d.ts`,
                globals: {
                    vue: 'Vue',
                    vite: 'Vite',
                },
            },
        ],
        plugins: [...plugins, dts()],
        watch,
    },
])
