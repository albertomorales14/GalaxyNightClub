import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        css: {
            preprocessorOptions: {
                scss: {
                    // Bootstrap 5 aún usa @import y funciones globales de Sass que están obsoletas
                    quietDeps: true,
                    silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function']
                }
            }
        },
        server: {
            port: 5173,
            // En desarrollo, /api se redirige al servidor local: cliente y API comparten origen
            // y la cookie de sesión funciona igual que en producción con el rewrite de Vercel
            proxy: {
                '/api': env.DEV_API_PROXY || 'http://localhost:5050'
            }
        },
        build: {
            outDir: 'build',
            chunkSizeWarningLimit: 1500
        }
    };
});
