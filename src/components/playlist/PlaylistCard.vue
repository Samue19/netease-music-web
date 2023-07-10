<template>
  <div class="playlist-card" @click="goPlaylist">
    <div class="pl-inner">
      <img
        :src="playlist.picUrl"
        class="cover"
      />
      <div class="pl-desc">
        <span class="desc">播放量：{{ formatCount(playlist.playCount) }}</span>
      </div>
      <div class="pl-play">
        <Icon name="round-play-arrow" />
      </div>
    </div>
    <p class="pl-name">
      {{ playlist.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { toRef } from 'vue';
import type { PropType } from 'vue';

import Icon from '@/components/base/Icon.vue'
import { thumbnail, formatCount } from '@/utils/index'
import type { IPlaylist } from '@/types'

const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylist>,
    required: true,
  },
});

const router = useRouter();
const playlist = toRef(props, "playlist");

const goPlaylist = () => {
  router.push(`/playlist/${playlist.value.id}`);
};
</script>

<style lang="less" scoped>
.playlist-card {
  position: relative;
  display: inline-block;
  width: calc(20% - 8px);
  margin: 4px;
  margin-bottom: 32px;
  cursor: pointer;
  :hover {
    .pl-desc {
      transform: translateY(0);
    }

    .pl-play {
      opacity: 1;
    }
  }
  .pl-play {
      opacity: 0;
      position: absolute;
      left: 20px;
      bottom: 40px;
    }

  .pl-inner {
    position: relative;
    width: 100%;
    margin-bottom: 8px;
    overflow: hidden;
    border-radius: 4px;
    .cover {
    width: 100%;
    height: 100%;
  }
  .desc {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 6px;
    background-color: rgb(0 0 0 / 40%);
    transition: all 0.3s;
    transform: translateY(-100%);

    > span {
      font-size: 12px;
      color: #fff;
    }
  }
  }
  .pl-name {
    font-size: 12px;
    overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: nowrap;
  }

  .play {
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 24px;
    line-height: 22px;
    color: #d33a31;
    text-align: center;
    background: rgb(255 255 255 / 40%);
    opacity: 0;
    transition: all 0.3s;
  }
}
</style>
