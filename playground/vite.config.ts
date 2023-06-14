import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    root: './playground',
    plugins: [vue(), mkcert()],
    server: {
        https: true,
    },
});
