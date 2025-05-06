<template>
  <el-menu class="nav" mode="horizontal" :ellipsis="false">
    <div style="padding: 0.5rem" v-if="menuVertical">
      <el-button class="header-button" @click="toggle">
        <el-icon style="font-size: 1.5rem">
          <Fold v-if="!isCollapse" />
          <Expand v-else />
        </el-icon>
      </el-button>
    </div>
    <div v-if="menuVertical" class="flex-grow" />
    <div>
      <el-button class="header-button" @click="fullScreen">
        <svg
          v-if="!isFullscreen"
          t="1745994392722"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1608"
          width="24"
          height="24"
        >
          <path
            d="M85.333333 213.333333a128 128 0 0 1 128-128h85.333334a42.666667 42.666667 0 0 1 0 85.333334H213.333333a42.666667 42.666667 0 0 0-42.666666 42.666666v85.333334a42.666667 42.666667 0 0 1-85.333334 0V213.333333z"
            fill="#9F9F9F"
            p-id="1609"
          ></path>
          <path
            d="M85.333333 810.666667a128 128 0 0 0 128 128h85.333334a42.666667 42.666667 0 1 0 0-85.333334H213.333333a42.666667 42.666667 0 0 1-42.666666-42.666666v-85.333334a42.666667 42.666667 0 1 0-85.333334 0v85.333334z"
            fill="#000000"
            p-id="1610"
          ></path>
          <path
            d="M938.666667 810.666667a128 128 0 0 1-128 128h-85.333334a42.666667 42.666667 0 1 1 0-85.333334h85.333334a42.666667 42.666667 0 0 0 42.666666-42.666666v-85.333334a42.666667 42.666667 0 1 1 85.333334 0v85.333334z"
            fill="#9F9F9F"
            p-id="1611"
          ></path>
          <path
            d="M938.666667 213.333333a128 128 0 0 0-128-128h-85.333334a42.666667 42.666667 0 1 0 0 85.333334h85.333334a42.666667 42.666667 0 0 1 42.666666 42.666666v85.333334a42.666667 42.666667 0 1 0 85.333334 0V213.333333z"
            fill="#000000"
            p-id="1612"
          ></path>
        </svg>
        <svg
          v-else
          t="1745994889717"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1772"
          width="24"
          height="24"
        >
          <path
            d="M682.666667 810.666667a128 128 0 0 1 128-128h85.333333a42.666667 42.666667 0 1 1 0 85.333333h-85.333333a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 1 1-85.333333 0v-85.333333z"
            fill="#9F9F9F"
            p-id="1773"
          ></path>
          <path
            d="M682.666667 213.333333a128 128 0 0 0 128 128h85.333333a42.666667 42.666667 0 1 0 0-85.333333h-85.333333a42.666667 42.666667 0 0 1-42.666667-42.666667V128a42.666667 42.666667 0 1 0-85.333333 0v85.333333z"
            fill="#000000"
            p-id="1774"
          ></path>
          <path
            d="M341.333333 213.333333a128 128 0 0 1-128 128H128a42.666667 42.666667 0 0 1 0-85.333333h85.333333a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 1 85.333333 0v85.333333z"
            fill="#9F9F9F"
            p-id="1775"
          ></path>
          <path
            d="M341.333333 810.666667a128 128 0 0 0-128-128H128a42.666667 42.666667 0 1 0 0 85.333333h85.333333a42.666667 42.666667 0 0 1 42.666667 42.666667v85.333333a42.666667 42.666667 0 1 0 85.333333 0v-85.333333z"
            fill="#000000"
            p-id="1776"
          ></path>
        </svg>
      </el-button>
    </div>
    <div class="nav-item">
      <el-switch
        v-model="isDark"
        inline-prompt
        active-color="#686868"
        inactive-color="#000"
        :active-icon="Moon"
        :inactive-icon="Sunny"
        @change="toggleDark"
      />
    </div>
    <el-sub-menu index="2">
      <template #title>
        <el-avatar
          :size="32"
          :src="
            userinfo.avatar ? baseUrl + `system/file?id=` + userinfo.avatar : ''
          "
        />
        {{ userinfo.username }}
      </template>
      <el-menu-item index="2-1" @click="logOut">
        <span>注销</span>
      </el-menu-item>
      <el-menu-item index="2-2" @click="reloadRouter('/usercenter')">
        <span>个人中心</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
  <menu-tab></menu-tab>
</template>

<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { getUserInfo, logout } from "../../api/auth";
import screenfull from "screenfull";
import { computed, inject, onMounted, onUnmounted, ref, toRefs } from "vue";
import { Session } from "../../utils/storage";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { baseUrl, reloadRouter } from "../../api/common";
import MenuTab from "../../components/layout/MenuTab.vue";

const props = defineProps({
  isCollapse: Boolean,
});
const userinfo = ref({});
const { isCollapse } = toRefs(props);
const menuVertical = inject("menuVertical");
const emits = defineEmits(["update:isCollapse", "update:menuVertical"]);
const userId = Session.get("user");
const isDark = useDark();
const toggleDark = useToggle(isDark);
const isFullscreen = ref(false);

const updateFullscreen = () => {
  if (screenfull.isEnabled) {
    isFullscreen.value = screenfull.isFullscreen;
  }
};
const logOut = () => {
  logout();
};
const fullScreen = () => {
  screenfull.toggle();
};
const toggle = () => {
  emits("update:isCollapse", !props.isCollapse);
  Session.set("isCollapse", !props.isCollapse);
};
onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", updateFullscreen);
    updateFullscreen(); // 初始检查
  }
  getUserInfo(userId).then((res) => {
    userinfo.value = res.data;
  });
  return {
    userinfo,
  };
});
onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", updateFullscreen);
  }
});
</script>

<style scoped>
.nav-item {
  font-size: 24px;
  margin-right: 0.5rem;
}

.flex-grow {
  flex-grow: 1;
}

.logo {
  width: 40px;
  line-height: 100%;
}

.el-avatar {
  margin: 0.5rem;
}

.header-button {
  border: none;
  height: 100%;
  padding: 5px;
  margin: 10px;
}

.nav {
  align-items: center;
  height: 60px;
}

@media screen and (max-width: 1000px) {
  .flex-grow {
    flex-grow: 0;
  }

  .nav {
    justify-content: end;
  }
}
</style>
