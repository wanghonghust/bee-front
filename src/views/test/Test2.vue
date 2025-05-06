<template>
    <doc-editor v-model="content"></doc-editor>
</template>
<script setup>
import {ref} from "vue";
import DocEditor from "../../components/DocEditor/Index.vue"

const content = ref("")

</script>
<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

</style>