<template>
  <div class="teacher-videos-page">
    <!-- 顶部添加按钮 -->
    <div class="videos-header">
      <el-button type="primary" @click="showDialog = true">+ 添加视频</el-button>
    </div>

    <!-- 视频列表 -->
    <div class="video-grid">
      <div
          v-for="video in videos"
          :key="video.id"
          class="video-card"
      >
        <div class="cover">
          <img
              v-if="video.coverUrl"
              :src="video.coverUrl.startsWith('http') ? video.coverUrl : `/videos/${getFileName(video.coverUrl)}`"
              alt="封面"
          />
          <div v-else class="cover-placeholder">
            <i class="mdi mdi-video-outline" style="font-size:48px; color:#999;"></i>
          </div>
        </div>
        <div class="info">
          <h3 class="title">{{ video.title }}</h3>
          <p class="desc">{{ video.description || '暂无描述' }}</p>
        </div>
      </div>
    </div>

    <!-- 添加新视频对话框 -->
    <el-dialog
        v-model="showDialog"
        title="添加新视频"
        width="520px"
        @open="resetForm"
    >
      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入视频标题" />
        </el-form-item>

        <el-form-item label="简介" prop="description">
          <el-input
              type="textarea"
              rows="3"
              v-model="form.description"
              placeholder="请输入视频简介"
          />
        </el-form-item>

        <el-form-item label="视频文件" prop="video">
          <input type="file" accept="video/*" @change="onVideoChange" />
          <div v-if="form.video">{{ form.video.name }}</div>
        </el-form-item>

        <el-form-item label="封面文件" prop="cover">
          <input type="file" accept="image/*" @change="onCoverChange" />
          <div v-if="form.cover">{{ form.cover.name }}</div>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

// 类型定义
interface ShortVideo {
  id: number
  title: string
  description?: string
  videoUrl: string
  coverUrl?: string
}

// 列表数据
const videos = ref<ShortVideo[]>([])

// 弹窗和表单相关
const showDialog = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  title: '',
  description: '',
  video: null as File | null,
  cover: null as File | null
})

// 校验规则
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  description: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  video: [{ required: true, message: '请选择视频文件', trigger: 'change' }]
}

// 重置表单
function resetForm() {
  form.title = ''
  form.description = ''
  form.video = null
  form.cover = null
  formRef.value?.clearValidate()
}

// 文件选择
function onVideoChange(e: Event) {
  form.video = (e.target as HTMLInputElement).files?.[0] ?? null
}
function onCoverChange(e: Event) {
  form.cover = (e.target as HTMLInputElement).files?.[0] ?? null
}

// 提交上传
async function submit() {
  await formRef.value?.validate()
  if (!form.video) {
    ElMessage.error('请先选择视频文件')
    return
  }

  const fd = new FormData()
  fd.append('title', form.title)
  fd.append('description', form.description)
  fd.append('video', form.video)
  if (form.cover) {
    fd.append('cover', form.cover)
  }

  try {
    await request.post('/video/add', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    ElMessage.success('上传成功')
    showDialog.value = false
    await loadVideos()
  } catch (err: any) {
    console.error('上传失败', err)
    ElMessage.error(err.response?.data || '上传出错')
  }
}

// 拉取列表
async function loadVideos() {
  try {
    const { data } = await request.get<ShortVideo[]>('/video/list')
    videos.value = data
  } catch (e) {
    console.error('获取视频列表失败', e)
  }
}

// 后端保存的是绝对路径，前端取文件名拼 URL
function getFileName(path: string) {
  return path.split('/').pop() || ''
}

onMounted(loadVideos)
</script>

<style scoped>
.teacher-videos-page {
  padding: 16px;
}
.videos-header {
  text-align: right;
  margin-bottom: 16px;
}
.video-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.video-card {
  width: 280px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: box-shadow .2s;
}
.video-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
.cover {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover-placeholder {
  font-size: 48px;
  color: #999;
}
.info {
  padding: 12px;
}
.title {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.desc {
  margin: 8px 0 0;
  font-size: 14px;
  color: #666;
  height: 2.4em;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* 弹窗 body padding */
.add-video-dialog :deep(.el-dialog__body) {
  padding: 20px 24px;
}
</style>
