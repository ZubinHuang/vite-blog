import type { HeadConfig } from 'vitepress'

const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/blog/assets/favicon.ico' }],
  ['meta', { name: 'author', content: 'AaronWong' }],
  ['meta', { name: 'keywords', content: 'AaronWong技术博客关于编程和软件开发的最新技术文章' }],
]

export default head