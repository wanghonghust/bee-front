<template>
  <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab"
      @tab-click="changeTab"
  >
    <el-tab-pane
        key="/index"
        label="首页"
        name="/index"
    >
      <template #label>
        <span>
        <el-icon>
          <el-image class="logo" src="/OIP-C.png"></el-image>
        </el-icon>
        首页
        </span>
      </template>
    </el-tab-pane>
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :name="item.name"
    >
      <template #label>
        <span>
        <el-icon :class="item.icon"></el-icon>
        {{ item.title }}
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref} from 'vue'
import bus from "../../utils/bus";
import {reloadRouter} from "../../api/common";
import {TabsPaneContext} from "element-plus";
import Event from "vite";
import router from "../../router";

const editableTabsValue = ref("")
const editableTabs = ref([])
onMounted(() => {
  const tabs = localStorage.getItem("editableTabs")
  if (tabs !== null) {
    editableTabs.value = JSON.parse(tabs)
  }
  editableTabsValue.value = router.currentRoute.value.fullPath
  bus.on("editableTabs", (parma: any) => {
    editableTabs.value = parma.value
  })
  bus.on("editableTabsValue", (param: any) => {
    editableTabsValue.value = param
  })
})

onBeforeUnmount(() => {
  bus.off("editableTabs")
  bus.off("editableTabsValue")
})
const changeTab = (tab: TabsPaneContext, event: Event) => {
  reloadRouter(String(tab.props.name))
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }
  editableTabs.value = editableTabs.value.filter((tab) => tab.name !== targetName)
  if (editableTabs.value.length === 0) {
    activeName = "/index"
  }
  editableTabsValue.value = activeName
  reloadRouter(activeName)
  bus.emit("editableTabs", editableTabs)
  localStorage.setItem("editableTabs", JSON.stringify(editableTabs.value))
}
</script>

<style scoped>
.el-tabs {
  --el-tabs-header-height: 30px !important;
}

.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border-radius: 0 !important;
}

:deep(.el-tabs__nav-next) {
  line-height: 30px;
  padding-top: 3px;
}

:deep(.el-tabs__nav-prev) {
  line-height: 30px;
  padding-top: 3px;
}

</style>