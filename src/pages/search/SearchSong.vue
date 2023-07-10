<template>
  <div class="result">
    <SongCard v-for="song of songs" :key="song.id" :song="song" />
  </div>
  <ElPagination
    v-model:currentPage="currentPage"
    layout="prev, pager, next"
    :total="total"
    @current-change="searchCallback"
  />
</template>

<script setup lang="ts">
import { ElPagination } from 'element-plus';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { getSearch } from '@/api/search';
import { SearchType } from '@/utils/constant';
import type { ISong } from '@/types';
import SongCard from '@/components/song/SongCard.vue'

const route = useRoute();
const emits = defineEmits(['count']);

const total = ref<number>(0);
const currentPage = ref<number>(1);
const songs = ref<ISong[]>([]);

const searchCallback = async () => {
    const res = await getSearch({
        keywords: route.params.keywords as string,
        type: SearchType.single,
        offset: currentPage.value - 1,
    })
    total.value = res?.total;
    songs.value = res?.songs || [];

    emits('count', {
        song: total.value
    })
}

watch(
    () => route.params,
    () => {
        searchCallback()
    }
)

onMounted(() => {
    searchCallback()
})

</script>

<style scoped>

</style>
