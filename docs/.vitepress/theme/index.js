import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'
import AlanViteComponent from "@xiaomh/vue3-alan-vite-component"
import ArticleMetadata from "./components/ArticleMetadata.vue"
import HomeBackgrount from "./components/HomeBackgrount.vue"
import PersonalCard from './components/PersonalCard.vue'
import Confetti from './components/Confetti.vue'
import VisitorPanel from "./components/VisitorPanel.vue";
import busuanzi from "busuanzi.pure.js";
import { inBrowser } from "vitepress";
import '@xiaomh/vue3-alan-vite-component/lib/style.css';
import "./global.scss"
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'
const playlist = [
  {
    name: '我在名为秋天的路上遇见你',
    author: 'FYNial',
    file: 'https://music.163.com/song/media/outer/url?id=1398274079.mp3',
  },
  {
    name: 'Melody (Original mix)',
    author: 'A s h',
    file: 'https://music.163.com/song/media/outer/url?id=36921285.mp3',
  },
  {
    name: '踏山河',
    author: '七叔-叶泽浩',
    file: 'https://music.163.com/song/media/outer/url?id=1804320463.mp3',
  },
  {
    name: '安和桥',
    author: '宋冬野',
    file: 'https://music.163.com/song/media/outer/url?id=27646205.mp3',
  },
  {
    name: '一个人去巴黎',
    author: '董又霖',
    file: 'https://music.163.com/song/media/outer/url?id=864647841.mp3',
  },
  {
    name: 'Letting Go',
    author: '刘大拿',
    file: 'https://music.163.com/song/media/outer/url?id=1923184888.mp3',
  },
  {
    name: '克林',
    author: '棱镜乐队',
    file: 'https://music.163.com/song/media/outer/url?id=549320309.mp3',
  },
]

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots
  Layout: MyLayout,
    enhanceApp ({ app,router }) {
      // 线上环境才上报
     router.onBeforeRouteChange=(to)=>{
      if(import.meta.env.MODE==='production'){
        if(typeof _hmt !=='undefined'&&!!to){
          _hmt.push(['_trackPageview',to])
        }
      }
     }
    app.use(AlanViteComponent)
    app.component('ArticleMetadata', ArticleMetadata)
    app.component('HomeBackgrount', HomeBackgrount)
    app.component('PersonalCard', PersonalCard)
    app.component(vitepressMusic(playlist))
    app.component("Confetti", Confetti);
    app.component("VisitorPanel", VisitorPanel);
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch();
      };
    }
  }
}