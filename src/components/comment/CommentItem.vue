<template>
  <div class="comment">
    <div class="avatar">
      <img :src="thumbnail(comment.avatarUrl, 40)" />
    </div>
    <div class="content is-border">
      <div class="text">
        <span class="username">{{ comment.nickname }}:</span
        ><span class="text">{{ comment.content }}</span>
      </div>
      <div v-if="comment.repliedNickname" class="replied">
        <div class="text">
          <span class="username">{{ comment.repliedNickname }}:</span>
          <span class="text">{{ comment.repliedContent }}</span>
        </div>
      </div>
      <div class="info">
        <span class="date">{{
          dayjs(comment.time).format("YYYY-MM-DD HH:mm")
        }}</span>
        <div class="actions">
          <Icon name="thumb" />
          <span>{{ comment.likedCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { toRef } from "vue";
import type { PropType } from "vue";

import Icon from "@/components/base/Icon.vue";
import { thumbnail } from "@/utils";
import type { IComment } from "@/types";

const props = defineProps({
  comment: {
    type: Object as PropType<IComment>,
    required: true,
  },
});
const comment = toRef(props, "comment");
</script>

<style lang="less" scoped>
.comment {
  display: flex;
  padding-top: 20px;

  .avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    margin-right: 12px;

    img {
      @include round(100%);
    }
  }

  .content {
    width: 100%;
    padding-bottom: 20px;
    font-size: 12px;

    @include when(border) {
      border-bottom: 1px solid #f2f2f1;
    }
  }

  .replied {
    padding: 8px;
    margin-top: 8px;
    background: #e6e5e6;
    border-radius: 4px;
  }

  .text {
    .username {
      display: inline-block;
      margin-right: 4px;
      color: #517eaf;
    }

    .text {
      line-height: 1.5;
    }
  }

  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;

    .date {
      color: #bebebe;
    }

    .actions {
      color: #bebebe;

      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
