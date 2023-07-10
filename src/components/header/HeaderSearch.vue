<template>
  <el-input
    v-model="searchKey"
    :suffix-icon="Search"
    @click="isSearch = true"
    @keyup.enter="goSearch(searchKey, true)"
    placeholder="请输入歌曲名"
    style="width: 200px;"
  />
  <teleport to="#app">
    <div v-show="isSearch" ref="outside" class="search">
      <p class="title">热门搜索</p>
      <div class="tags">
        <span
          v-for="hot of hots"
          :key="hot"
          class="tag"
          @click="goSearch(hot, true)"
        >
          {{ hot }}</span
        >
      </div>
      <p class="title">搜索历史</p>
      <div class="tags">
        <span v-for="hot of storage" :key="hot" class="tag" @click="goSearch(hot)">
          {{ hot }}
        </span>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ElInput } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { getSearchHot } from "@/api/search";
import { usePlayerStore } from "@/store/modules/player";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { isEmpty } from "@/utils";
import { GLOBAL_SEARCH_HOT_KEY } from "@/utils/constant";
import { useStorage, onClickOutside } from "@vueuse/core";

const router = useRouter();
const playerStore = usePlayerStore();

const searchKey = ref<string>("");
const isSearch = ref<boolean>(false);
const outside = ref(null);

const hots = ref<string[]>([]);
const storage = useStorage<string[]>(GLOBAL_SEARCH_HOT_KEY, []);
onClickOutside(outside, () => {
  if (isSearch.value) {
    isSearch.value = false;
  }
});

const goSearch = (keyword: string, history = false) => {
  if (isEmpty(keyword)) {
    return;
  }

  isSearch.value = false;
  router.push("/search/" + keyword);
  playerStore.setLyricPageStatus(false);

  if (history) {
    storage.value.unshift(keyword);
    storage.value = [...new Set(storage.value)];
  }
};

onMounted(async () => {
  hots.value = await getSearchHot();
});
</script>

<style scoped>
.search {
  position: fixed;
  top: 50px;
  left: 250px;
  bottom: 60px;
  z-index: 10;
  width: 350px;
  height: 360px;
  padding: 15px 20px;
  background-color: #fff;
  border: solid 1px #9a9a9a;
  border-radius: 5px;
  .title {
    margin-bottom: 15px;
    font-size: 12px;
    color: #5c5c5c;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
  .tag {
    padding: 4px 15px;
    margin-right: 5px;
    margin-bottom: 10px;
    font-size: 12px;
    cursor: pointer;
    border: 1px solid #d9d9d9;
    border-radius: 2px;

    :hover {
      background: #f5f5f5;
    }
  }
}
</style>
