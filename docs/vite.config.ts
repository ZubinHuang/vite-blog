//vite.config.ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vite";
import { SponsorPlugin } from 'vitepress-plugin-sponsor'
//default options
var options = {
  previewLength: 62,
  buttonLabel: "Search",
  placeholder: "Search docs",
};

export default defineConfig({
  base: '/blog/',

  plugins: [
    SearchPlugin(),
    SponsorPlugin({
      type: 'simple',
      aliPayQR: 'https://www.zubylon.tech/blog/assets/AliPay.jpg',
      weChatQR: 'https://www.zubylon.tech/blog/assets/WechatPay.jpg'
    }),
  ],

});