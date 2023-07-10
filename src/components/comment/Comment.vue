<template>
  <div class="comment">
    <div v-if="commentsHot.length" class="comment__block">
      <p class="comment__title">精彩评论</p>
      <CommentItem v-for="comment of commentsHot" :key="comment.id" :comment="comment" />
    </div>
    <div v-if="commentsNew.length" class="comment__block">
      <p class="comment__title">最新评论</p>
      <CommentItem v-for="comment of commentsNew" :key="comment.id" :comment="comment" />
    </div>
    <div v-if="commentsNew.length" class="comment__pagination">
      <ElPagination
        v-model:currentPage="currentPage"
        layout="prev, pager, next"
        :total="total"
        @current-change="commentNewCallback"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElPagination } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import type { PropType } from 'vue'

import CommentItem from './CommentItem.vue'
import { getCommentHot, getCommentNew } from '@/api/comment'
import type { CommentType } from '@/utils/constant'
import type { IComment } from '@/types'

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  type: {
    type: String as PropType<CommentType>,
    required: true,
  },
})

const commentsHot = ref<IComment[]>([])
const commentHotCallback = async () => {
  const comment = await getCommentHot({
    id: props.id,
    type: props.type,
    limit: 10,
  })
  commentsHot.value = comment.comments
}

const total = ref<number>(0)
const cursor = ref<string>('')
const currentPage = ref<number>(1)
const commentsNew = ref<IComment[]>([])
const commentNewCallback = async () => {
  const comment = await getCommentNew({
    id: props.id,
    type: props.type,
    pageNo: currentPage.value,
    pageSize: 30,
    sortType: 3,
    cursor: cursor.value,
  })
  total.value = comment.total
  cursor.value = comment.cursor
  commentsNew.value = comment.comments
}

const commentCallback = () => {
  if (!props.id) return
  currentPage.value = 1
  commentHotCallback()
  commentNewCallback()
}

watch(
  () => props.id,
  () => {
    commentCallback()
  }
)

onMounted(() => {
  commentCallback()
})
</script>

<style scoped>

</style>