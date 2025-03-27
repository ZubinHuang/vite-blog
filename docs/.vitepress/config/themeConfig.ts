
import nav from "./nav"
import sidebar from "./sidebar"
const themeConfig = {
  outline: 'deep',
  outlineTitle: '目录', // 右侧大纲标题文本配置
  lastUpdatedText: '最后更新', // 最后更新时间文本配置, 需先配置lastUpdated为true
  // 编辑链接配置
  editLink: {
    pattern: 'https://github.com/ZubinHuang',
    text: '不妥之处，敬请雅正'
  },
  docFooter: {
    prev: '上一页',
    next: '下一页'
  },
  footer: {
    message: `Powered By VitePress<br>
    Copyright © 2025 | zubylon.tech<br> <a href='https://beian.miit.gov.cn' style="text-decoration: none;  transition: color 0.3s;" target="_blank" >鄂ICP备2025100744号</a>  | <a href="tencent://message/?uin=1135245801" 
       style="text-decoration: none; ">
      <i class="icon-qq"></i> 
      联系QQ：1135245801
    </a>`,
  },
  nav,
  // algolia: {
  //   apiKey: 'f8e742898c758644dac164a10cf39ad9',
  //   indexName: 'index_name',
  //   // appId: '<APP_ID>',
  //   translations: {
  //     button: {
  //       buttonText: '搜索文档',
  //       buttonAriaLabel: '搜索文档',
  //     },
  //   },
  // },
  sidebar
}

export default themeConfig