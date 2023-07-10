<template>
  <teleport to="#app">
    <!-- 歌词封面 -->
    <div :class="{ hide: !lyricPageStatus }" class="player-lyric">
      <div class="content">
        <div class="song">
          <!-- 播放状态 -->
          <div class="cover">
            <img :src="PlayBarSupport" class="support" />
            <img :src="PlayBar" class="bar" :class="{ playing: playing }" />
            <div class="p-cover">
              <div class="inner" :class="{ paused: !playing }">
                <img :src="thumbnail(currentSong.picUrl, 400)" class="image" />
              </div>
            </div>
          </div>
          <!-- 歌词信息 -->
          <div class="lyric">
            <div class="name">
              {{ currentSong.name }}
            </div>
            <div class="desc">
              <span class="label">歌手：</span>
              <div class="value">
                {{ currentSong.artists }}
              </div>
            </div>
            <div ref="scroller" class="scroller wrap">
              <div
                v-for="(line, index) of lines"
                :ref="setItemRef"
                :key="line.timestamp"
                class="item"
                :class="{ 'is-active': lineActive === index }"
              >
                <p class="text">
                  {{ line.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 歌曲评论 -->
        <div class="comment">
          <Comment
            v-if="currentSong.id && lyricPageStatus"
            :id="currentSong.id"
            :type="CommentType.song"
          />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, ref, toRef, watch } from "vue";
import { Lrc, Runner } from "lrc-kit";
import type { PropType } from "vue";
import type { Lyric } from "lrc-kit";

import PlayBar from "@/assets/image/play-bar.png";
import PlayBarSupport from "@/assets/image/play-bar-support.png";
import Comment from "@/components/comment/Comment.vue";

import { getLyric } from "@/api/player";
import { thumbnail } from "@/utils";
import { CommentType } from "@/utils/constant";
import { usePlayerStore } from "@/store/modules/player";
import type { ISong } from "@/types";

const props = defineProps({
  playing: {
    type: Boolean,
    required: true,
  },
  currentTime: {
    type: Number,
    required: true,
  },
  currentSong: {
    type: Object as PropType<ISong>,
    required: true,
  },
});

const currentSong = toRef(props, "currentSong");

const playerStore = usePlayerStore();
const lyricPageStatus = computed<boolean>(() => playerStore.lyricPageStatus);

const lines = ref<Lyric[]>([]);
const lineActive = ref<number>(0);
const lrcInstance = ref<Runner>();
const lyricCallback = async () => {
  lrcInstance.value = undefined;
  const lyric = await getLyric({
    id: currentSong.value.id,
  });
  lrcInstance.value = new Runner(Lrc.parse(lyric.lrc.lyric));
  lines.value = lrcInstance.value.getLyrics();
};

watch(
  () => props.currentTime,
  (currentTime) => {
    if (lrcInstance.value) {
      lrcInstance.value.timeUpdate(currentTime);
      lineActive.value = lrcInstance.value.curIndex();
    }
  }
);

const scroller = ref();
const lyricLineRefs = ref<HTMLElement[]>([]);
const setItemRef = (el: HTMLElement): void => {
  lyricLineRefs.value.push(el);
};

watch(lineActive, (num: number) => {
  const curDom = lyricLineRefs.value[num];
  scroller.value.scrollTop = curDom.offsetTop - 130 + curDom.offsetHeight / 2;
});

watch(currentSong, (currentSong) => {
  if (currentSong.id) {
    lyricCallback();
    lyricLineRefs.value = [];
  }
});
</script>

<style lang="less" scoped>
@keyframes player-rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
.player-lyric {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 63px;
  left: 0;
  z-index: 10;
  padding: 0 36px;
  overflow: hidden;
  overflow-y: auto;
  background: #f9f9f9;
  transition: transform 0.5s;
  .content {
    max-width: 870px;
    margin: auto;
    .song {
      display: flex;
      .cover {
        position: relative;
        display: flex;
        justify-content: center;
        padding: 80px 70px 0 36px;
        .support {
          position: absolute;
          top: -15px;
          left: 180px;
          z-index: 2;
          width: 30px;
          height: 30px;
        }
        .bar {
          position: absolute;
          top: 0;
          left: 190px;
          z-index: 1;
          width: 100px;
          height: 146px;
          transition: all 0.3s;
          transform: rotate(-30deg);
          transform-origin: 0 0;
        }
        .playing {
          transform: rotate(5deg);
        }

        .p-cover {
          background: #e6e5e6;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .inner {
            height: 300px;
            width: 300px;
            border-radius: 50%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            background: #000;
            background: linear-gradient(-45deg, #333540, #070708, #333540);
            animation: player-rotate 20s linear infinite;
          }
        .paused {
          animation-play-state: paused;
        }
        }
        .image {
          width: 200px;
          height: 200px;
          border-radius: 50%;
        }
      }
      .lyric {
        flex: 1;
        padding-top: 45px;
        .name {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          font-size: 24px;
          color: #333;
        }
        .desc {
          display: flex;
          margin-right: 32px;
          margin-bottom: 30px;
          font-size: 12px;
          .label {
            display: inline-block;
            margin-right: 4px;
          }
          .value {
            color: #517eaf;
          }
        }
        .wrap {
          position: relative;
          width: 380px;
          height: 260px;
          overflow-y: auto;
        }
        .item {
          margin-bottom: 16px;
          font-size: 12px;
          .active {
            font-size: 14px;
            font-weight: 700;
            color: #333;
          }
        }

        .text {
          margin-bottom: 8px;
        }
      }
    }
    .comment {
      margin-top: 48px;
      margin-bottom: 36px;
    }
  }
}
.hide {
  transform: translateY(150%);
}
.show {
  transform: none;
}
</style>
