import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
// import { alias } from '../../alias'
// import UnoCSS from 'unocss/vite'

export default defineConfig(({ command }) => ({
  // resolve: {
  //   alias,
  // },
  // base: command === 'build' ? '/__unocss/' : '/',
  plugins: [
    // UnoCSS('uno.config.ts'),
    Vue(),
    Components({
      dirs: 'src/client/components',
      dts: 'src/client/components.d.ts',
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
      ],
      dts: 'src/client/auto-imports.d.ts',
    }),
    Pages({
      dirs: 'src/client/pages',
    }),
  ],
  build: {
    outDir: '.dist/client',
  },
}))