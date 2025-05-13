<!-- 文件路径：src/views/teacher/discussions/CreateDiscussion.vue -->
<template>
  <div class="p-6 bg-gray-50 min-h-full">
    <el-card class="max-w-xl mx-auto shadow-lg rounded-lg p-6 bg-white">
      <h2 class="text-2xl font-semibold text-blue-800 mb-6">
        创建讨论组
      </h2>

      <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="90px"
          class="space-y-4"
      >
        <el-form-item label="组名" prop="name">
          <el-input
              v-model="form.name"
              placeholder="请输入讨论组名称"
              maxlength="50"
              show-word-limit
          />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
              v-model="form.description"
              type="textarea"
              :rows="4"
              placeholder="请输入组描述（选填）"
              maxlength="200"
              show-word-limit
          />
        </el-form-item>

        <el-form-item>
          <div class="flex justify-end space-x-4">
            <el-button @click="onReset" :disabled="loading">重置</el-button>
            <el-button
                type="primary"
                :loading="loading"
                :disabled="!isValid"
                @click="onSubmit"
            >
              创建
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

interface CreateForm {
  name: string
  description: string
}

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)
const form = ref<CreateForm>({ name: '', description: '' })

const rules = {
  name: [
    { required: true, message: '讨论组名称不能为空', trigger: 'blur' },
    { min: 3, max: 50, message: '名称长度须在 3 到 50 字符之间', trigger: 'blur' }
  ],
  description: [
    { max: 200, message: '描述最多 200 字符', trigger: 'blur' }
  ]
}

const isValid = computed(() => {
  const n = form.value.name.trim().length
  const d = form.value.description.trim().length
  return n >= 3 && n <= 50 && d <= 200
})

async function onSubmit() {
  formRef.value?.validate(async valid => {
    if (!valid) return
    loading.value = true
    try {
      // 调后端接口创建讨论组，并取回新组的ID
      const res = await request.post<{ id: number }>('/discussions/create', {
        title: form.value.name,
        description: form.value.description
      })
      // 在成功提示中展示新组编号
      ElMessage.success(`创建成功，讨论组编号为：${res.data.id}`)
      // 跳回列表页
      router.push('/teacher/discussions')
    } catch (err: any) {
      console.error('创建失败', err)
      ElMessage.error(err.response?.data?.message || '创建失败，请重试')
    } finally {
      loading.value = false
    }
  })
}

function onReset() {
  formRef.value?.resetFields()
}
</script>

<style scoped>
.bg-gray-50 {
  background-color: #f6f8fb;
}
</style>
