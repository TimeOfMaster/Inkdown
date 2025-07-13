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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-signature'%3E%3Cpath d='M22 22H2'/%3E%3Cpath d='M19 15c-1.4 0-2.2 2.2-3.1 3.1-1.2 1.2-2.5 2.4-4.4 2.4-2.2 0-3.5-2.2-4.8-3.5C5.5 15.8 4 14 4 12.5c0-2 1.5-4.5 4-4.5s4.5 2.5 6 4c1.5 1.5 3 4 6 4s3-2 3-3.5c0-.9-.5-1.5-1-1.5'/%3E%3C/svg%3E`, media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-signature'%3E%3Cpath d='M22 22H2'/%3E%3Cpath d='M19 15c-1.4 0-2.2 2.2-3.1 3.1-1.2 1.2-2.5 2.4-4.4 2.4-2.2 0-3.5-2.2-4.8-3.5C5.5 15.8 4 14 4 12.5c0-2 1.5-4.5 4-4.5s4.5 2.5 6 4c1.5 1.5 3 4 6 4s3-2 3-3.5c0-.9-.5-1.5-1-1.5'/%3E%3C/svg%3E`, media: '(prefers-color-scheme: dark)' }],
  ],
  description: "Markdown to PDF Converter",
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TimeOfMaster/Inkdown' }
    ],
    nav: nav(),
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/licenses_credits/': {base: '/licenses_credits/', items: sidebarLicense() },
    },
    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2025-present Tim Eschmann'
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['yargs']
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
        { text: 'What is Inkdown?', link: '/' },
        { text: 'Installation', link: '/installation' },
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
      ]
    }
  ];
}
