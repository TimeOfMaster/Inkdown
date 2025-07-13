// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import "@catppuccin/vitepress/theme/mocha/mauve.css"
import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout
}
