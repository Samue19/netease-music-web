<template>
  <div v-show="playlist.id" class="intro-card">
    <div class="ic-wrapper">
      <div class="cover">
        <img :src="playlist.picUrl" />
      </div>
      <div class="content">
        <div class="tag">精品歌单</div>
        <p class="name">
          {{ playlist.name }}
        </p>
        <p class="desc">
          {{ playlist.description }}
        </p>
      </div>
    </div>
    <div
      class="ic-bg"
      :style="`background-image: url(${playlist.picUrl});`"
    ></div>
    <div class="bgmask"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getTopPlaylistHighquality } from "@/api/playlist";
import type { IPlaylist } from "@/types";

const playlist = ref<IPlaylist>({} as IPlaylist);

onMounted(async () => {
  const { playlists } = await getTopPlaylistHighquality({ limit: 1 });
  if (playlists.length) {
    playlist.value = playlists[0];
  }
});
</script>

<style lang="less" scoped>
.intro-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 4px;
  .ic-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 16px;
    .cover {
      flex-shrink: 0;
      width: 140px;
      height: 140px;
      margin-right: 8px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .content {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
    }

    .tag {
      align-self: flex-start;
      padding: 4px 15px;
      margin-bottom: 10px;
      font-size: 13px;
      color: #e7aa5a;
      border: 1px solid #e7aa5a;
      border-radius: 4px;
    }

    .name {
      margin-bottom: 8px;
      font-size: 16px;
      color: #fff;
    }

    .desc {
      font-size: 12px;
      line-height: 14px;
      color: rgb(255 255 255 / 50%);
    }
  }
  .ic-bg {
    z-index: 0;
    filter: blur(16px);
  }
  .bgmask {
    z-index: 0;
    background-color: rgb(0 0 0 / 50%);
  }
}
</style>
