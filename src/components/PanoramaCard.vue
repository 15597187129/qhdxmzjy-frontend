<template>
  <el-card class="panorama-card">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <p>{{ formattedDate }}</p>
    <el-button type="primary" @click="$emit('preview')">预览</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  date: String,
})

const formattedDate = computed(() => {
  return new Date(props.date!).toLocaleDateString()})
</script>

<style scoped>
.panorama-card {
  margin: 10px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
