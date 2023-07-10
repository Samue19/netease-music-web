<template>
  <div class="player-progress slider-hover-button">
    <ElSlider
      v-model="progress"
      :min="0"
      :max="duration"
      :show-tooltip="false"
      class="hover-button"
      @input="changeProgress"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElSlider } from 'element-plus'

const props = defineProps({
  currentTime: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
})
const emits = defineEmits(['update:currentTime'])

const progress = ref<number>(0)
const changeProgress = () => {
  emits('update:currentTime', progress.value)
}

watch(
  () => props.currentTime,
  (currentTime) => {
    progress.value = currentTime
  }
)
</script>

<style lang="less" scoped>
.player-progress {
  position: absolute;
  top: -9px;
  left: 0;
  width: 100%;
  padding: 10px 0;
  height: 20px;
  .el-slider {
    height: 0;
  }
}
</style>