<template>
    <div class="prev">
      <ElTooltip content="暂未开发" placement="top">
        <Icon name="player-prev" size="22" />
      </ElTooltip>
    </div>
    <div class="play">
      <Icon :name="status" size="50" @click="changeStatus" />
    </div>
    <div class="next">
      <ElTooltip content="暂未开发" placement="top">
        <Icon name="player-next" size="22" />
      </ElTooltip>
    </div>
  </template>

<script setup lang="ts">
import { ElTooltip } from 'element-plus'
import Icon from '@/components/base/Icon.vue'
import { computed } from 'vue';

const props = defineProps({
  playing: {
    type: Boolean,
    required: true      
  }
})

const emits = defineEmits(['update:playing']);
const status = computed(() => (props.playing ? 'player-pause' : 'player-play'))
const changeStatus = () => {
  emits('update:playing', !props.playing);
}
</script>

<style lang="less" scoped>
.center {
  .prev {
    color: #d33a31;
  }
  .next {
    color: #d33a31;
  }
  .play {
    margin: 0 10px;
    color: #d33a31;
    cursor: pointer;
  }
}
</style>