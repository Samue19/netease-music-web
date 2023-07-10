<template>
  <div class="detail-header">
    <div v-show="playlist.id" class="cover">
      <img :src="playlist.coverImgUrl" />
    </div>
    <div v-show="playlist.id" class="content">
      <div>
        <div class="dh-title">
          {{ playlist.name }}
        </div>
        <div class="dh-creator">
          <img class="avatar" :src="playlist.avatarUrl" />
          <p class="creator">
            {{ playlist.name }}
          </p>
          <p class="time">{{ playlist.createTime }} 创建</p>
        </div>
      </div>
      <div class="dh-desc">
        <p class="desc">标签：{{ playlist.tags }}</p>
        <p class="desc">简介：{{ playlist.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from "vue";
import type { PropType } from "vue";
import type { IPlaylistDetail } from "@/types";

const props = defineProps({
  playlist: {
    type: Object as PropType<IPlaylistDetail>,
    required: true,
  },
});
const playlist = toRef(props, "playlist");
</script>

<style lang="less" scoped>
.detail-header {
  display: flex;
  min-height: 236px;
  padding-bottom: 36px;
  .cover {
    width: 200px;
    height: 200px;
    margin-right: 24px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .content {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .dh-title {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      font-size: 16px;
      color: #333;
    }
    .dh-creator {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
      font-size: 14px;

      .avatar {
        width: 30px;
        height: 30px;
        margin-right: 8px;
        border-radius: 50%;
      }

      .creator {
        margin-right: 8px;
      }

      .time {
        font-size: 12px;
      }
    }
    .dh-desc {
      font-size: 14px;

      .desc {
        margin-top: 8px;
      }
    }
  }
}
</style>
