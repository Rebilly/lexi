import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
    root: './playground',
    // Set the base path, without this vite will reference the js and asset
    // files as "/etc/blah.js" which will break the page if hosted at a sub
    // path such as www.example.com/lexi/
    base: './',
    plugins: [vue(), mkcert()],
    server: {
        https: true,
    },
});
