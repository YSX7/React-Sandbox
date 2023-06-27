import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    // comment this out if that isn't relevant for your project
    base: '/React-Sandbox/',
    build: {
        outDir: 'build',
    },
    plugins: [
        reactRefresh(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    },
})