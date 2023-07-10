<template>
  <div class="menu-user">
    <!-- 登录后 -->
    <div v-if="user" class="user" @click="logout">
      <img class="avatar" :src="user.avatarUrl" alt="" />
      <p class="name">
        {{ user.nickname }}
      </p>
    </div>
    <!-- 登录前 -->
    <div v-else class="user" @click="loginVisible = true">
      <img
        class="avatar"
        src="http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg"
        alt=""
      />
      <p class="name">未登录</p>
    </div>
    <!-- UID登录 -->
    <ElDialog
      v-model="loginVisible"
      title="登录"
      width="500px"
      :append-to-body="true"
    >
      <div class="">
        <ElInput v-model="uid" placeholder="请输入您的网易云uid" />
        <div class="uid">
          <p>
            1、请点我
            <a href="http://music.163.com" target="_blank"
              >(http://music.163.com)</a
            >打开网易云音乐官网
          </p>
          <p>2、点击页面右上角的“登录”</p>
          <p>3、点击您的头像，进入我的主页</p>
          <p>4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）</p>
        </div>
        <div class="uid">
          <ElButton type="primary" class="login" @click="login(uid)">
            登录
          </ElButton>
        </div>
      </div>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/modules/user";
import { isEmpty } from "@/utils";
import { GLOBAL_UID_KEY } from "@/utils/constant";
import { useStorage } from "@vueuse/core";
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, computed, onMounted } from "vue";

const userStore = useUserStore();
const storage = useStorage(GLOBAL_UID_KEY, "");
const loginVisible = ref<boolean>(false);
const uid = ref<string>("");

const user = computed(() => userStore.user);

const login = async (uid: string) => {
  loginVisible.value = !(await userStore.login(uid));
};
const logout = async () => {
  ElMessageBox.confirm("确定退出登录?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    userStore.logout();
    ElMessage.success("退出成功");
  });
};
onMounted(() => {
  if (!isEmpty(storage.value)) {
    login(storage.value);
  }
});
</script>

<style lang="less" scoped>
.menu-user {
  padding: 16px;

  .user {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .avatar {
    width: 40px;
    border-radius: 40px;
  }

  .name {
    padding-left: 10px;
    font-size: 14px;
  }
}
.uid {
  margin-top: 20px;

  p {
    line-height: 28px;
  }
  .login {
    width: 100%;
  }
}
</style>
