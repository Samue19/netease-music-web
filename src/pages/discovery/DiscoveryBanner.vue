<template>
    <ElCarousel type="card" height="200px">
        <ElCarouselItem v-for="item of banners" :key="item.imageUrl">
            <img :src="item.imageUrl" :alt="item.typeTitle"/>
        </ElCarouselItem>
    </ElCarousel>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElCarouselItem, ElCarousel } from 'element-plus'

import { getBanner } from '@/api/base';
import type { IBanner } from '@/types';

const banners = ref<IBanner[]>([])
onMounted(async () => {
    banners.value = await getBanner();
})
</script>

<style scoped>

</style>