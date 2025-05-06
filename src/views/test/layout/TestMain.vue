<template>
    <div class="main">
      <el-scrollbar>
        <router-view/>
      </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
</script>
<style scoped>
:deep(.el-tabs__content) {
  padding: 5px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

:deep(.el-tabs__header) {
  border-bottom: none;
  box-shadow: 0 2px 10px rgb(218 218 218 / 86%);
  padding-bottom: 1px;
}

.main {
  border-radius: 5px;
  height: calc(100vh - 140px);
  box-shadow: 0 2px 10px rgb(218 218 218 / 86%);
}
</style>
