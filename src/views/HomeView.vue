<template>
  <div>
    头部导航栏
  </div>

  <Menu
    theme="light"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    style="width: 156px"
    mode="vertical"
    @click="handleClick"
    selectable
  >
    <menu-item key="1">
      发现音乐
    </menu-item>
    <menu-item key="2">
      推荐歌单
    </menu-item>
    <menu-item key="3">
      最新音乐
    </menu-item>
    <menu-item key="4">
      最新MV
    </menu-item>
  </Menu>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Menu, MenuItem } from "ant-design-vue";
import type { MenuProps } from 'ant-design-vue';

const state = reactive({
  selectedKeys: ['1'],
  openKeys: [],
});
const handleClick: MenuProps["onClick"] = (menuInfo) => {
  console.log("click ", menuInfo);
};

</script>

<style scoped></style>
