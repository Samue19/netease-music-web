<template>
  <div class="header">
    <!-- logo -->
    <div style="width: 250px"> <a href="/">网易云音乐</a></div>
    <div
      style="
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: calc(100vw - 250px);
      "
    >
      <!-- 搜索 -->
      <HeaderSearch></HeaderSearch>
      <!-- 登录状态 -->
      <div>login</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderSearch from "./HeaderSearch.vue";
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 9;
  display: flex;
  align-items: center;
  border-bottom: solid 1px #efefef;
  background-color: #fff;
}
</style>
