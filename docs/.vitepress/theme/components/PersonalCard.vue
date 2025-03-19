<template>
  <div class="square-card">
    <!-- 主图标区域 -->
    <div class="icon-wrapper">
      <img
        :src="config.avatar"
        class="main-icon"
        alt="Main Icon"
        @click="toggleMusic"
      />
      <!-- 动态音符 -->
      <div class="music-indicator" v-show="isPlaying">
        <span v-for="n in 3" :key="n" class="ripple"></span>
      </div>
    </div>

    <!-- 纵向信息区 -->
    <div class="vertical-content">
      <h3 class="nickname">{{ config.nickname }}</h3>
      <button class="play-button" :class="{ playing: isPlaying }">
        {{ isPlaying ? "暂停音乐" : "播放音乐" }}
      </button>
    </div>

    <audio
      ref="audioPlayer"
      :src="config.musicUrl"
      @ended="isPlaying = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const config = {
  avatar: "https://i.imgur.com/6KXJxWm.png",
  nickname: "胖虎电台",
  musicUrl:
    "https://s3.amazonaws.com/pb_previews/663_gentle-innovations/663_full_gentle-innovations_0145_preview.mp3",
};

const audioPlayer = ref<HTMLAudioElement | null>(null);
const isPlaying = ref(false);

const toggleMusic = () => {
  isPlaying.value = !isPlaying.value;
  if (audioPlayer.value) {
    isPlaying.value ? audioPlayer.value.play() : audioPlayer.value.pause();
  }
};
</script>

<style scoped scss>
.square-card {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-4px);
  }
}

.icon-wrapper {
  position: relative;
  flex: 2;
  display: grid;
  place-items: center;
  background: linear-gradient(45deg, #a8edea 0%, #fed6e3 100%);
}

.main-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
}

.music-indicator {
  position: absolute;
  bottom: -20px;
  display: flex;
  gap: 8px;
}

.ripple {
  width: 12px;
  height: 12px;
  background: #ff6b6b;
  border-radius: 50%;
  animation: ripple 1.2s infinite;

  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.4s;
  }
  &:nth-child(3) {
    animation-delay: 0.8s;
  }
}

@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
}

.vertical-content {
  flex: 1;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nickname {
  margin: 0;
  font-size: 1.4rem;
  color: #495057;
  font-weight: 600;
}

.play-button {
  align-self: center;
  padding: 8px 24px;
  border: none;
  border-radius: 25px;
  background: #4dabf7;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #339af0;
    box-shadow: 0 4px 12px rgba(77, 171, 247, 0.4);
  }

  &.playing {
    background: #ff6b6b;

    &:hover {
      background: #ff5252;
    }
  }
}
</style>
