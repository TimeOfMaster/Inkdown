import { DefaultTheme, defineConfig } from 'vitepress'

export default defineConfig({
  title: "Inkdown",
  head: [
    ['link', { rel: 'stylesheet', href: '/theme/custom.css' }],
    /* 
    * Icon from Lucide (https://lucide.dev/)
    * ISC License
    * Copyright (c) Lucide Contributors 2022
    */
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNpZ25hdHVyZS1pY29uIGx1Y2lkZS1zaWduYXR1cmUiPjxwYXRoIGQ9Im0yMSAxNy0yLjE1Ni0xLjg2OEEuNS41IDAgMCAwIDE4IDE1LjV2LjVhMSAxIDAgMCAxLTEgMWgtMmExIDEgMCAwIDEtMS0xYzAtMi41NDUtMy45OTEtMy45Ny04LjUtNGExIDEgMCAwIDAgMCA1YzQuMTUzIDAgNC43NDUtMTEuMjk1IDUuNzA4LTEzLjVhMi41IDIuNSAwIDEgMSAzLjMxIDMuMjg0Ii8+PHBhdGggZD0iTTMgMjFoMTgiLz48L3N2Zz4=`, media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjZGQ2ZjQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zaWduYXR1cmUtaWNvbiBsdWNpZGUtc2lnbmF0dXJlIj48cGF0aCBkPSJtMjEgMTctMi4xNTYtMS44NjhBLjUuNSAwIDAgMCAxOCAxNS41di41YTEgMSAwIDAgMS0xIDFoLTJhMSAxIDAgMCAxLTEtMWMwLTIuNTQ1LTMuOTkxLTMuOTctOC41LTRhMSAxIDAgMCAwIDAgNWM0LjE1MyAwIDQuNzQ1LTExLjI5NSA1LjcwOC0xMy41YTIuNSAyLjUgMCAxIDEgMy4zMSAzLjI4NCIvPjxwYXRoIGQ9Ik0zIDIxaDE4Ii8+PC9zdmc+`, media: '(prefers-color-scheme: dark)' }],
  ],
  description: "Markdown to PDF Converter",
  markdown: {
    theme: {
      light: 'catppuccin-latte',
      dark: 'catppuccin-mocha',
    },
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TimeOfMaster/Inkdown' }
    ],
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
      '/licenses_credits/': {base: '/licenses_credits/', items: sidebarLicense() },
    },
    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2025-present Tim Eschmann'
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/' },
    { text: 'License & Credits', link: '/licenses_credits/license' },
  ]
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Introduction',
      items: [
        { text: 'What is Inkdown?', link: '/guide/' },
        { text: 'Installation', link: '/guide/installation' },
      ]
    }
  ]
}

function sidebarLicense(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'License', link: 'license' },
    {
      text: 'Credits',
      collapsed: false,
      base: '/licenses_credits/',
      items: [
        { text: 'Lucide', link: 'lucide_credits' },
        { text: 'Catppuccin', link: 'catppuccin_credits' },
      ]
    }
  ];
}
