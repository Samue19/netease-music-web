<template>
<div class="song-card" @click="setCurrentPlaySong">
    <div class="sc-order">
      <span class="order">{{ padZero(song.order) }}</span>
    </div>
    <div v-if="song.picUrl" class="sc-cover">
      <img :src="song.picUrl" class="" />
    </div>
    <div class="sc-text" :class="{ 'is-active': currentSong && currentSong.id === song.id }">
      {{ song.name }}
    </div>
    <div class="sc-text">
      {{ song.artists }}
    </div>
    <div class="sc-text">
      {{ song.album }}
    </div>
    <div class="sc-time">
      {{ dayjs(song.duration).format('mm:ss') }}
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed, toRef } from 'vue';
import type { PropType } from 'vue';

import { usePlayerStore } from '@/store/modules/player'
import { thumbnail, padZero } from '@/utils'
import type { ISong } from '@/types'

const props = defineProps({
    song: {
        type: Object as PropType<ISong>,
        required: true,
    }
})

const song = toRef(props, 'song');
const playerStore = usePlayerStore();

const setCurrentPlaySong = () => {
    playerStore.setCurrentSong(song.value);
}

const currentSong = computed(() => playerStore.currentSong);
</script>

<style lang="less" scoped>
.song-card {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  .sc-order {
    width: 60px;
    color: #bebebe;
  }
  .sc-cover {
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .sc-text {
    flex: 1;
    margin-left: 20px;
  }

  .sc-time {
    width: 60px;
  }
}
</style>