<template>
    <div class="menu">
        <MenuUser></MenuUser>
        <MenuSong></MenuSong>
    </div>
</template>

<script setup lang="ts">
import MenuSong from './MenuSong.vue'
import MenuUser from './MenuUser.vue'


</script>

<style scoped>
.menu {
    position: fixed;
    top: 50px;
    bottom: 60px;
    left: 0px;
    z-index: 9;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: calc(100vh - 50px - 60px);
    border-right: solid 1px #efefef;
    background-color: #fff;
}
</style>