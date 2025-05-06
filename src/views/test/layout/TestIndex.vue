<template>
  <div class="test-layout">
    <el-container>
      <el-aside width="200px">
        <TestSideBar/>
      </el-aside>
      <el-container>
        <el-header>
          <TestHeader/>
        </el-header>
        <el-main style="padding: 0">
          <TestMain/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import TestMain from "./TestMain.vue";
import TestHeader from "./TestHeader.vue";
import TestSideBar from "./TestSideBar.vue";
import {Delete}from '@element-plus/icons-vue'

// export default {
//   components: {TestMain, TestHeader, TestSideBar}
// }
</script>

<style scoped>
.el-container {
  height: 100%;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs__header {
  border-bottom: none;
}

.el-aside > .el-menu {
  height: 100%;
}

.test-layout {
  width: 100vw;
  height: 100vh;
}

</style>
