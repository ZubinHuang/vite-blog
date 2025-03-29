import type { HeadConfig } from "vitepress";

const head: HeadConfig[] = [
  ["link", { rel: "icon", href: "/blog/assets/favicon.ico" }],
  ["meta", { name: "author", content: "AaronWong" }],
  [
    "meta",
    {
      name: "keywords",
      content: "AaronWong技术博客关于编程和软件开发的最新技术文章",
    },
  ],
  [
    "script",
    {},
    `window._hmt = window._hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?0ef675570b30f8c640e5163650717afa";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();`,
  ],
];

export default head;
