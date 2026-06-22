import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../public/dist/dashboard',
        emptyOutDir: true,
        rollupOptions: {
            input: 'src/main.jsx',
            output: {
                entryFileNames: 'main.js',
                chunkFileNames: '[name].js',
                assetFileNames: '[name][extname]',
                format: 'iife',
                name: 'DashboardApp',
            },
        },
    },
})
