import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      VueRouter({ dts: './src/types/typed-router.d.ts' }),
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS(),
      AutoImport({
        resolvers: [ElementPlusResolver(), AntDesignVueResolver({ importStyle: false })],
        imports: ['vue', VueRouterAutoImports],
        dts: './src/types/auto-imports.d.ts'
        /* eslintrc: {
          enabled: true,
          filepath: "./src/types/.eslintrc-auto-import.json",
        }, */
      }),
      Components({ resolvers: [ElementPlusResolver()] })
    ],
    // 定义全局变量（构建时被静态替换）
    define: {
      __MODULE_NAME__: JSON.stringify(mode)
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
