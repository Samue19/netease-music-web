<template>
  <layout style="height: 100vh">
    <layout-header>
      <Header></Header>
    </layout-header>
    <layout>
      <layout-sider
        ><Menu
          theme="light"
          v-model:openKeys="state.openKeys"
          v-model:selectedKeys="state.selectedKeys"
          style="width: 100%; height: 100%"
          mode="vertical"
          @click="handleClick"
          selectable
        >
          <menu-item key="1"> 发现音乐 </menu-item>
          <menu-item key="2"> 推荐歌单 </menu-item>
          <menu-item key="3"> 最新音乐 </menu-item>
          <menu-item key="4"> 最新MV </menu-item>
        </Menu></layout-sider
      >
      <layout>
        <layout-content>
          <div>
            <Menu v-model:selectedKeys="current" mode="horizontal">
              <menu-item key="1"> 个性推荐 </menu-item>
              <menu-item key="2"> 歌单 </menu-item>
              <menu-item key="3"> 排行榜 </menu-item>
              <menu-item key="4"> 歌手 </menu-item>
              <menu-item key="5"> 最新音乐 </menu-item>
            </Menu>
          </div>
          <div style="height: 300px;">
            <carousel autoplay dots
            dotsClass="slick-dots">
              <div><h3>1</h3></div>
              <div><h3>2</h3></div>
              <div><h3>3</h3></div>
              <div><h3>4</h3></div>
            </carousel>
          </div>
          <div>
            <div>
                推荐歌单 >
            </div>
            
          </div>
        </layout-content>
        <layout-footer>Footer</layout-footer>
      </layout>
    </layout>
  </layout>

  <div></div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  Menu,
  MenuItem,
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  LayoutSider,
  Carousel
} from "ant-design-vue";
import type { MenuProps } from "ant-design-vue";

import Header from "@/components/header/index.vue";

const state = reactive({
  selectedKeys: ["1"],
  openKeys: [],
});
const current = ref<string[]>(["1"]);
const handleClick: MenuProps["onClick"] = (menuInfo) => {
  console.log("click ", menuInfo);
};
</script>

<style scoped>
.ant-layout-header {
  background-color: rgb(255, 43, 45);
}
.ant-layout-sider {
  background: #fff;
}
.dot {
    background-color: aqua;
}
</style>
