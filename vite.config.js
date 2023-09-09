import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
    return {
        plugins: [
            react(),
        ],
        server: {
            open: '/index.html',
            proxy: {
                '/uploads': {
                    target: "https://www.amante.co.kr",
                    changeOrigin: true,
                }
            },
            port: 3000
        },
        resolve: {
            alias: {
                '@': '/src',
                '@components': "/src/components",
                '@utils': "/src/utils",
                '@contexts': "/src/contexts",
                '@apis': "/src/apis",
                '@styles': "/src/styles",
                '@pages': "/src/pages"
            }
        },
        build: {
            chunkSizeWarningLimit: 2048, // Set the limit to 1024 kB (1 MB)
        },
    }
})
