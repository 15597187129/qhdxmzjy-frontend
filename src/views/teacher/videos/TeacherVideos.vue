<template>
  <div class="teacher-videos">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>视频管理</span>
        <router-link to="/teacher/videos/upload">
          <el-button type="primary" style="float: right;">上传视频</el-button>
        </router-link>
      </div>
      <el-table :data="videos" style="width: 100%">
        <el-table-column prop="title" label="视频标题" align="center"></el-table-column>
        <el-table-column prop="description" label="简介" align="center"></el-table-column>
        <el-table-column prop="createdAt" label="上传时间" align="center" width="200">
          <template v-slot="scope">
            <span>{{ formatDate(scope.row.createdAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="120">
          <template v-slot="scope">
            <el-button
                type="danger"
                size="small"
                @click="deleteVideo(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';

// 定义视频接口类型
interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  coverUrl?: string;
  uploaderId: number;
  createdAt: string;
}

// 从本地存储获取 Token
function getToken(): string | null {
  return localStorage.getItem('token');
}

const videos = ref<Video[]>([]);

function formatDate(dateString: string): string {
  if (!dateString) return '无';
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', { hour12: false });
}

async function loadVideos() {
  try {
    const res = await request.get('/video/list', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (Array.isArray(res.data)) {
      videos.value = res.data;
    } else {
      videos.value = [];
      console.warn('视频数据格式不正确:', res.data);
    }
  } catch (error) {
    ElMessage.error('加载视频列表失败');
    console.error('视频列表加载错误:', error);
  }
}

async function deleteVideo(id: number) {
  try {
    await request.delete(`/video/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    ElMessage.success('视频删除成功');
    loadVideos();
  } catch (error) {
    ElMessage.error('删除失败，请稍后重试');
    console.error('删除视频出错:', error);
  }
}

onMounted(() => {
  loadVideos();
});
</script>

<style scoped>
.teacher-videos {
  padding: 20px;
}

.el-card {
  margin-bottom: 20px;
}

.el-table th, .el-table td {
  text-align: center;
}

.el-button {
  margin: 0 5px;
}
</style>
