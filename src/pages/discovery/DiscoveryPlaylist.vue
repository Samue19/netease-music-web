<template>
    <h6 class="title"> 推荐歌单 </h6>
    <div>
        <PlaylistCard v-for="playlist of playlists" :key="playlist.id" :playlist="playlist"></PlaylistCard>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import PlaylistCard from '@/components/playlist/PlaylistCard.vue'
import type { IPlaylist } from '@/types';
import { getPersonalizedPlaylist } from '@/api/playlist';

const playlists = ref<IPlaylist[]>([]);
onMounted(async () => {
    playlists.value = await getPersonalizedPlaylist({ limit: 10});
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