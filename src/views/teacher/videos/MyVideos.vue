<template>
  <div class="my-videos">
    <h2>我的视频</h2>
    <el-table :data="videos" style="width: 100%">
      <el-table-column prop="title" label="视频标题" />
      <el-table-column prop="description" label="简介" />
      <el-table-column prop="createdAt" label="上传时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click="deleteVideo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';

const videos = ref([]);

async function fetchVideos() {
  try {
    const response = await request.get('/api/video/list');
    videos.value = response.data;
  } catch (error) {
    ElMessage.error('获取视频列表失败');
  }
}

async function deleteVideo(id: number) {
  try {
    await request.delete(`/api/video/delete/${id}`);
    ElMessage.success('视频删除成功');
    fetchVideos();
  } catch (error) {
    ElMessage.error('视频删除失败');
  }
}

onMounted(() => {
  fetchVideos();
});
</script>

<style scoped>
.my-videos {
  padding: 20px;
}

.el-table {
  margin-top: 20px;
}
</style>
