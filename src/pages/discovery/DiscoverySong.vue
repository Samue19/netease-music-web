<template>
    <h6 class="title"> 最新音乐 </h6>
    <div>
        <SongCard v-for="song of songs" :key="song.id" :song="song"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import SongCard from '@/components/song/SongCard.vue'
import type { ISong } from '@/types'
import { getPersonalizedNewsong } from '@/api/playlist'

const songs = ref<ISong[]>([])
onMounted(async () => {
    songs.value = await getPersonalizedNewsong({ limit: 10 })
})

</script>

<style scoped>
.title {
    padding: 10px 0;
    font-size: 18px;
    font-weight: normal;
    color: #333;
}
</style>