<template>
  <div class="playimg" @click="togglePlayer">
    <img class="blur" :src="thumbnail(props.currentSong.picUrl, 40)" />
    <div class="mask"></div>
    <Icon :name="iconStatus" class="control" size="22" />
  </div>
  <div class="playcon" @click="togglePlayer">
    <div class="name">
      <span class="">{{ props.currentSong.name }}</span>
      <span class="">-</span>
      <span class="">{{ props.currentSong.artists }}</span>
    </div>
    <div class="time">
      <span class="">{{
        dayjs(props.currentTime, "seconds").format("mm:ss")
      }}</span>
      <span class="">/</span>
      <span class="">{{
        dayjs(props.duration, "seconds").format("mm:ss")
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import type { PropType } from "vue";

import Icon from "@/components/base/Icon.vue";
import { thumbnail } from "@/utils";
import { usePlayerStore } from "@/store/modules/player";
import type { ISong } from "@/types";

const props = defineProps({
  currentSong: {
    type: Object as PropType<ISong>,
    required: true,
  },
  currentTime: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});

const playerStore = usePlayerStore();
const iconStatus = computed<string>(() =>
  playerStore.lyricPageStatus ? "shrink" : "expand"
);
const togglePlayer = () => {
  playerStore.setLyricPageStatus();
};
</script>

<style lang="less" scoped>
.player {
  .playimg {
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 5px;
    .blur {
      width: 40px;
      height: 40px;
    }
    .mask {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgb(0 0 0 / 20%);
    }
    .control {
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 50px;
      font-weight: bold;
      color: #fff;
      transform: translate(-50%, -50%);
    }
  }

  .playcon {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    font-size: 12px;
    .time {
      span:nth-of-type(1),
      span:nth-of-type(3) {
        display: inline-block;
        min-width: 40px;
      }

      span:nth-of-type(2) {
        display: inline-block;
        margin-right: 8px;
      }
    }
    .name {
      span:nth-of-type(1) {
        font-size: 13px;
        font-weight: 500;
        color: #333;
      }

      span:nth-of-type(2) {
        display: inline-block;
        margin-right: 5px;
        margin-left: 5px;
      }
    }
  }
}
</style>
