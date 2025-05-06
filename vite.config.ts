import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vitejs.dev/config/
function _resolve(dir: string) {
    return path.resolve(__dirname, dir)
}
export default defineConfig({

    plugins: [vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),],
    server: {
        port: 8089,
        host: '127.0.0.1',
        https: false,
    },
    resolve:{
        alias:{
            '@':_resolve("src")
        }
    }

})
