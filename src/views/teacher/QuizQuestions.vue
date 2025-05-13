<!-- src/views/teacher/QuizQuestions.vue -->
<template>
  <el-card class="questions-card">
    <h2>查看题目</h2>
    <el-table
        :data="questions"
        stripe
        style="width: 100%"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="content" label="题干" />
      <el-table-column label="选项">
        <template #default="{ row }">
          <el-tag
              v-for="opt in formatOptions(row)"
              :key="opt.label"
              class="option-tag"
          >
            {{ opt.label }}. {{ opt.text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="correctAnswer" label="正确答案" width="120" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'
import type { Question } from '@/types'  // 建议在 @/types.ts 里定义 Question 接口

// 前端需要的选项结构
interface Option {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

const questions = ref<Question[]>([])

async function loadQuestions() {
  try {
    // 拉取所有题目
    const { data } = await request.get<Question[]>('/questions')

    // 只保留“最新”的 10 条 —— 根据 ID 倒序，再取前 10 条
    const latestTen = data
        .slice()                    // 复制一份，避免原数组被修改
        .sort((a, b) => b.id - a.id)
        .slice(0, 10)

    questions.value = latestTen
  } catch (err) {
    console.error('获取题目失败', err)
  }
}

onMounted(loadQuestions)

/**
 * 根据后端的 optionA..optionD 字段，组装成一个数组返回
 */
function formatOptions(row: Question): Option[] {
  const opts: Option[] = [
    { label: 'A', text: row.optionA },
    { label: 'B', text: row.optionB },
    { label: 'C', text: row.optionC },
    { label: 'D', text: row.optionD },
  ]
  // 过滤掉可能的空字符串
  return opts.filter(o => !!o.text)
}
</script>

<style scoped>
.questions-card {
  padding: 24px;
}
.questions-card h2 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #333;
}
.option-tag {
  margin-right: 8px;
  margin-bottom: 4px;
}
</style>
