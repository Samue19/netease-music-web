<template>
  <div class="menu-scroll">
    <div class="menu-song" v-for="menus of menusList" :key="menus.name">
      <p class="title">{{ menus.name }}</p>
      <ul v-for="menu of menus.children" :key="menu.link">
        <RouterLink v-slot="{ navigate, isExactActive }" :to="menu.link" custom>
          <li
            class="item"
            :class="{ 'is-active': isExactActive }"
            @click="navigate"
          >
            <span class="value">
              {{ menu.name }}
            </span>
          </li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { localMenus } from "@/utils/local";
import type { IMenu } from "@/types";
import { useUserStore } from "@/store/modules/user";
import { getUserPlaylist } from "@/api/user";
import Icon from '@/components/base/Icon.vue'

const userStore = useUserStore();

const menusList = ref<IMenu[]>([]);
watchEffect(async () => {
  if (userStore.user) {
    const reqMenus = await getUserPlaylist({ uid: userStore.user.userId });
    menusList.value = localMenus.concat(reqMenus);
  } else {
    menusList.value = localMenus;
  }
});
</script>

<style lang="less" scoped>
.menu-scroll {
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  .menu-song {
    margin-bottom: 15px;

    .title {
      padding: 0 15px;
      margin-bottom: 15px;
      font-size: 12px;
      color: #909090;
    }

    .item {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.1s;
      .value {
        margin-left: 10px;
      }
    }
    .item:hover {
      background-color: #e7e7e7;
    }
    .is-active {
        color: #d33a31;
        background: #e7e7e7;
      }
  }
}
</style>
