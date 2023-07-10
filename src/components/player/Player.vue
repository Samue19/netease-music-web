<template>
  <div class="player">
    <audio ref="audio" :loop="true" :autoplay="true" />
    <PlayerLyric
      v-if="playerStore.currentSong"
      :playing="playing"
      :current-time="currentTime"
      :current-song="playerStore.currentSong"
    />
    <PlayerProgress v-model:currentTime="currentTime" :duration="duration" />
    <div class="left">
      <PlayerContent
        v-if="playerStore.currentSong"
        :current-song="playerStore.currentSong"
        :current-time="currentTime"
        :duration="duration"
      />
    </div>
    <div class="center">
      <PlayerControl v-model:playing="playing" />
    </div>
    <div class="right">
      <PlayerVolume v-model:volume="volume" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useMediaControls } from "@vueuse/core";

import PlayerLyric from "@/components/player/PlayerLyric.vue";
import PlayerProgress from "@/components/player/PlayerProgress.vue";
import PlayerContent from "@/components/player/PlayerContent.vue";
import PlayerControl from "@/components/player/PlayerControl.vue";
import PlayerVolume from "@/components/player/PlayerVolume.vue";
import { usePlayerStore } from "@/store/modules/player";

const playerStore = usePlayerStore();
const currentSongSrc = computed(() => {
  return playerStore.currentSong
    ? `https://music.163.com/song/media/outer/url?id=${playerStore.currentSong.id}.mp3`
    : "";
});

const audio = ref<HTMLVideoElement>();
const { playing, currentTime, duration, volume } = useMediaControls(audio, {
  src: currentSongSrc
});
</script>

<style lang="less" scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 60px;
  padding: 5px 20px;
  background: #fff;
  .left {
    display: flex;
    flex: 1;
    align-items: center;
    height: 50px;
  }
  .center {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .right {
    display: flex;
    float: 1;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
  }
}
</style>
