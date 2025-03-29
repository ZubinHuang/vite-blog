<script setup>
import DefaultTheme from "vitepress/theme";
import Copyright from "./layout/Copyright.vue";
import ValineComment from "../ValineComment/index.vue";
import { useData } from "vitepress";
import md5 from "blueimp-md5";
import { onMounted } from "vue";
const { page } = useData();
import Layout from "./components/Layout.vue";
import SvgIcon from "./components/SvgIcon.vue";
const detectDeviceType = () => {
  if (typeof window === "undefined") return;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
};

onMounted(async () => {
  // 在这里动态导入 `oh-my-live2d`, 并调用 `loadOml2d` 方法
  const { loadOml2d } = await import("oh-my-live2d");

  // 在这里使用
  loadOml2d({
    tips: (_, currentIndex) => {
      if (currentIndex === 0) {
        return {
          copyTips: {
            message: ["复制了啥?"],
          },
          idleTips: {
            wordTheDay: true,
          },
        };
      } else {
        return {
          idleTips: {
            wordTheDay: false,
          },
        };
      }
    },
    menus: {
      items: (defaultItems) => [
        ...defaultItems.filter((item) => item.id !== "About"), // 移除原About项
        {
          id: "About",
          title: "GitHub",
          icon: () =>
            h(SvgIcon, {
              name: "github",
              size: 16,
              class: "text-dark dark:text-light",
            }),
          onClick: () => {
            window.open("https://github.com/webEngineerWong");
          },
        },
      ],
    },
    models: [
      {
        path: "https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/kesshouban/model.json",
        position: [50, 20],
        scale: 0.2,
      },
      {
        path: "https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/haru02/haru02.model.json",
        position: [-80, 80],
        scale: 0.1,
      },
    ],
    dockedPosition: "left",
    primaryColor: "#38B0DE",
    tips: {
      wordTheDay: true,
    },
  });
});
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <ClientOnly>
        <Copyright :key="md5(page.relativePath)" />
      </ClientOnly>
    </template>
    <template #home-hero-after>
      <Live2D />
    </template>
    <template #doc-after>
      <ClientOnly>
        <ValineComment />
        <AlanBackTop v-if="detectDeviceType() === 'Desktop'"></AlanBackTop>
      </ClientOnly>
    </template>
  </Layout>
  <Confetti></Confetti>
  <VisitorPanel />
</template>
