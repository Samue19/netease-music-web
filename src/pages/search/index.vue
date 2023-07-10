<template>
  <div class="search-header">
    <span class="keywords">{{ keywords }}</span>
    <span class="found">找到 {{ searchCount[activeName] }} 个结果</span>
  </div>
  <ElTabs v-model="activeName">
    <ElTabPane label="歌曲" name="song">
      <SearchSong @count="searchCountCallback" />
    </ElTabPane>
    <ElTabPane label="歌单" name="playlist">
      <SearchPlaylist @count="searchCountCallback" />
    </ElTabPane>
  </ElTabs>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { ElTabs, ElTabPane } from "element-plus";

import SearchSong from "./SearchSong.vue";
import SearchPlaylist from "./SearchPlaylist.vue";

const route = useRoute();
const keywords = computed<string>(() => {
  return route.params.keywords as string;
});
const activeName = ref<string>("song");

const searchCount = ref<any>({});
const searchCountCallback = (count: any) => {
  searchCount.value = { ...searchCount.value, ...count };
};
</script>

<style scoped>
.search-header {
  padding: 20px 0;
  .keywords {
    display: inline-block;
    margin-right: 4px;
    font-size: 24px;
    font-weight: 700;
  }
  .found {
    font-size: 12px;
    color: #bebebe;
    letter-spacing: 2px;
  }
}
</style>
