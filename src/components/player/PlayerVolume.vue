<template>
  <div class="player-volume">
    <Icon :name="volumeStatusName" size="20" @click="changeVolumeStatus" />
    <ElSlider
      v-model="volume"
      :min="0"
      :max="1"
      :step="0.01"
      :show-tooltip="false"
      class="slider"
      @input="changeVolume"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { ElSlider } from 'element-plus'
import Icon from '@/components/base/Icon.vue'

const props = defineProps({
    volume: {
        type: Number,
        required: true
    }
})
const emits = defineEmits(['update:volume'])
const volume = ref<number>(0.75);
const changeVolume = () => {
    emits('update:volume', volume.value);
}

const volumeCache = ref<number>(0)
const volumeStatus = ref<boolean>(true)
const volumeStatusName = computed(() => (volumeStatus.value ? 'volume-up' : 'volume-off'))
const changeVolumeStatus = () => {
  volumeStatus.value = !volumeStatus.value
  if (volumeStatus.value) {
    volume.value = volumeCache.value
  } else {
    volumeCache.value = volume.value
    volume.value = 0
  }
}

onMounted(() => {
  changeVolume()
})

watch(
  () => props.volume,
  (newv) => {
    volume.value = newv
  }
)
</script>

<style lang="less" scoped>
.player-volume {
  position: relative;
  display: flex;
  align-items: center;
  width: 200px;
  .icon {
    font-size: 20px;
    cursor: pointer;
    transform: translateY(-0%) !important;
    color: #d33a31;
  }

  .slider {
    width: 150px;
    margin-left: 10px;
  }
}
</style>