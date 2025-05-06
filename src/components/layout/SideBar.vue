<template>
  <el-menu
    class="side-menu"
    :default-active="currentPath"
    :router="true"
    unique-opened
    active-text-color="#74b1ff"
    :collapse="isCollapse"
    @select="handleSelect"
  >
    <el-menu-item index="/index" class="index">
      <el-icon>
        <el-image class="logo" src="/OIP-C.png"></el-image>
      </el-icon>
      <template #title style="text-align: end">
        <span class="system_title">Admin</span>
      </template>
    </el-menu-item>
    <SubMenu :subMenu="menus" />
  </el-menu>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import router from "../../router/index";
import SubMenu from "./SubMenu.vue";
import { getAllMenu } from "../../api/sys-menu";
import { getUserInfo } from "../../api/auth";
import { Session } from "../../utils/storage";
import bus from "../../utils/bus";
import { findMenuByLink } from "../../api/common";

interface Menu {
  id: number;
  label: string;
  parentId: number | null;
  link: string;
  icon: string;
  children?: Menu[] | null;
  createAt: string;
}

interface Tab {
  title: string;
  name: string;
  icon: string;
}

const editableTabsValue = ref("");
const editableTabs = ref<Tab[]>([]);
const userId = Session.get("user");
const props = defineProps({
  isCollapse: Boolean,
});
const currentPath = ref(router.currentRoute.value.fullPath);

const { isCollapse } = toRefs(props);
const route = useRoute();
const menus = ref<Menu[]>([]);
const getMenus = () => {
  getAllMenu()
    .then((res) => {
      menus.value = res.data.menus;
    })
    .catch(() => {});
};
const getUserMenus = () => {
  getUserInfo(userId).then((res) => {
    menus.value = res.data.menu;
  });
};

onMounted(() => {
  const tabs = localStorage.getItem("editableTabs");
  if (tabs != null) {
    editableTabs.value = JSON.parse(tabs);
  }
  bus.on("editableTabs", (parma: any) => {
    editableTabs.value = parma.value;
  });
  bus.on("editableTabsValue", (param: any) => {
    editableTabsValue.value = param;
  });
  getUserMenus();
});

const handleSelect = (
  key: string,
  keyPath: string[],
  item: any,
  routeResult: any
) => {
  const currentMenu = findMenuByLink(menus.value, key);
  if (currentMenu) {
    const tabInfo = {
      title: currentMenu.label,
      name: key,
      icon: currentMenu.icon,
    };
    let result = editableTabs.value.some((item) => {
      if (item.name == key) {
        return true;
      }
    });
    if (!result) {
      editableTabs.value.push(tabInfo);
    }
  }
  bus.emit("editableTabsValue", key);
  bus.emit("editableTabs", editableTabs);
  localStorage.setItem("editableTabs", JSON.stringify(editableTabs.value));
};
watch(
  () => route.params,
  (newValue, oldValue) => {
    currentPath.value = router.currentRoute.value.fullPath;
  },
  { immediate: true }
);
</script>

<style scoped>
:deep(.el-sub-menu__title > span) {
  padding-right: 1rem;
}

:deep(.el-sub-menu .el-menu-item) {
  min-width: auto;
}

.el-menu {
  border-right: none;
}

:deep(.el-menu-item.is-active) {
  background-color: #006be626;
  color: #006be6;
}
:deep(.el-menu-item:hover) {
  background-color: #006be626;
  color: #006be6;
}
.index {
  background-color: transparent !important;
}
:deep(.el-menu-item) {
  margin: 5px;
  border-radius: 10px;
}
.system_title {
    font-size: 20px;
    font-weight: bold;
}
</style>
