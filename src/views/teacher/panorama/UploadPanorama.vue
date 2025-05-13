<!-- src/views/teacher/panorama/UploadPanorama.vue -->
<template>
  <div class="upload-panorama">
    <h2 class="title">上传全景图片</h2>

    <el-form :model="form" ref="formRef" label-width="80px" class="upload-form">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入全景图片标题" />
      </el-form-item>

      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" placeholder="请输入描述" />
      </el-form-item>

      <el-form-item label="选择图片" prop="file">
        <el-upload
            ref="uploadRef"
            class="upload-demo"
            :file-list="fileList"
            :limit="1"
            :auto-upload="false"
            accept="image/jpeg, image/png, image/webp"
            list-type="text"
            @change="handleChange"
            @remove="handleRemove"
            :before-upload="beforeUpload"
        >
          <el-button type="primary" v-if="!fileList.length">选择文件</el-button>
        </el-upload>

        <div v-if="fileList.length" class="file-preview">
          <span class="file-name">{{ fileList[0].name }}</span>
          <el-button
              type="danger"
              icon="el-icon-close"
              size="small"
              class="remove-btn"
              @click="removeFile"
          ></el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="upload"
            :disabled="!form.file"
            :loading="uploading"
        >
          上传
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

interface UploadForm {
  title: string
  description: string
  file: File | null
}

const form = ref<UploadForm>({
  title: '',
  description: '',
  file: null,
})

const fileList = ref<any[]>([])
const uploading = ref(false)

function handleChange(file: any) {
  // 直接使用 file，去掉 raw
  form.value.file = file as File
  fileList.value = [file]
}

function handleRemove() {
  form.value.file = null
  fileList.value = []
}

function removeFile() {
  form.value.file = null
  fileList.value = []
}

function beforeUpload(file: File) {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    ElMessage.error('仅支持 jpg、jpeg、png、webp 格式图片')
    return false
  }
  if (file.size > 10 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 10MB')
    return false
  }
  return true
}

async function upload() {
  if (!form.value.file) {
    ElMessage.error('请先选择图片')
    return
  }

  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  formData.append('file', form.value.file)

  uploading.value = true
  try {
    await request.post('/panorama/upload', formData)
    ElMessage.success('上传成功')
    form.value.file = null
    fileList.value = []
  } catch (err: any) {
    ElMessage.error(err.response?.data?.message || '上传失败')
  } finally {
    uploading.value = false
  }
}
</script>


<style scoped>
.upload-panorama {
  padding: 24px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.upload-form {
  max-width: 400px;
}

.file-preview {
  display: flex;
  align-items: center;
  margin-top: 8px;
  padding: 6px 12px;
  background-color: #f5f7fa;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}

.file-name {
  font-size: 14px;
  color: #333;
  margin-right: 8px;
}

.remove-btn {
  margin-left: auto;
  background-color: transparent;
  color: #ff4d4f;
}
</style>
