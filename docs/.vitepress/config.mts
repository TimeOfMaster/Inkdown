import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Inkdown",
  description: "Markdown to PDF Converter",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Inkdown?', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
          ]
        }
      ]
    }
  }
})
