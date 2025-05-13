<template>
  <div class="upload-video">
    <h2>上传视频</h2>
    <el-form ref="uploadForm" label-width="80px">
      <el-form-item label="视频标题">
        <el-input v-model="title" placeholder="输入视频标题" />
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="description" placeholder="输入视频简介" />
      </el-form-item>
      <el-form-item label="封面上传">
        <input type="file" @change="handleCoverChange" />
      </el-form-item>
      <el-form-item label="视频上传">
        <input type="file" @change="handleVideoChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleUpload">上传</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';

const title = ref('');
const description = ref('');
const coverFile = ref<File | null>(null);
const videoFile = ref<File | null>(null);

function handleCoverChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    coverFile.value = target.files[0];
  }
}

function handleVideoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    videoFile.value = target.files[0];
  }
}

async function handleUpload() {
  if (!title.value || !description.value || !coverFile.value || !videoFile.value) {
    ElMessage.error('请填写完整信息');
    return;
  }

  const formData = new FormData();
  formData.append('title', title.value);
  formData.append('description', description.value);
  formData.append('coverFile', coverFile.value);
  formData.append('videoFile', videoFile.value);

  try {
    const response = await request.post('/video/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    ElMessage.success('视频上传成功');
    console.log('上传成功:', response.data);
    resetForm();
  } catch (error) {
    ElMessage.error('视频上传失败');
    console.error('上传失败:', error);
  }
}

function resetForm() {
  title.value = '';
  description.value = '';
  coverFile.value = null;
  videoFile.value = null;
}
</script>

<style scoped>
.upload-video {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
}

.el-form-item {
  margin-bottom: 16px;
}
</style>
