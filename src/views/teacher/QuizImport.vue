<!-- src/views/teacher/QuizImport.vue -->
<template>
  <div class="quiz-import-page">
    <el-card class="import-card">
      <h2 class="card-title">Excel 导入题库</h2>

      <!-- 拖拽上传区域 -->
      <el-upload
          class="upload-area"
          drag
          accept=".xlsx,.xls"
          :auto-upload="false"
          list-type="text"
          :file-list="fileList"
          @change="handleChange"
          @remove="handleRemove"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将 Excel 文件拖到此处，或<em>点击上传</em>
        </div>
      </el-upload>

      <!-- 操作按钮 -->
      <div class="import-action">
        <el-button
            type="primary"
            :loading="loading"
            :disabled="!selectedFile || loading"
            @click="startImport"
        >
          开始导入
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import request from '@/utils/request'
import type { UploadFile } from 'element-plus'
import { ElMessage } from 'element-plus'

/** Element Plus 的文件列表 */
const fileList = ref<UploadFile[]>([])
/** 当前选中的原始 File 对象 */
const selectedFile = ref<File | null>(null)
/** 导入中状态 */
const loading = ref(false)

/** 用户选中或拖入文件时触发 */
function handleChange(file: UploadFile, fl: UploadFile[]) {
  // 只保留最后一个
  fileList.value = fl.slice(-1)
  // 从 UploadFile.raw 中拿出原生 File
  selectedFile.value = file.raw instanceof File ? file.raw : null
}

/** 用户移除文件时触发 */
function handleRemove() {
  fileList.value = []
  selectedFile.value = null
}

/** 点击“开始导入” */
async function startImport() {
  if (!selectedFile.value) return
  loading.value = true

  const formData = new FormData()
  formData.append('file', selectedFile.value)

  try {
    // 注意：后端接口是 /api/questions/import
    const res = await request.post('/questions/import', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    ElMessage.success(res.data.message || '导入成功')
    // 清空
    handleRemove()
  } catch (err: any) {
    console.error(err)
    const msg = err.response?.data?.message || '导入失败'
    ElMessage.error(msg)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.quiz-import-page {
  padding: 24px;

  .import-card {
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
  }

  .card-title {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .upload-area {
    width: 100%;
    margin-bottom: 24px;
  }

  .import-action {
    text-align: right;
  }
}
</style>
