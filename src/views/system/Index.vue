<template>
  <!-- 要给外层div指定合适的宽度 -->
  <iframe :src="modelUri" width="100%" height="100%" ></iframe>
</template>
<script setup lang="ts">
import {ref} from "vue"

const modelUri = ref("/3dmodel")
</script>

