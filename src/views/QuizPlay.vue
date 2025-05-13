<!-- src/views/QuizPlay.vue -->
<template>
  <!-- 顶部保留原有导航 -->
  <Navbar />

  <!-- 答题容器，水平垂直居中 -->
  <div class="quiz-container">
    <el-card class="quiz-card" shadow="hover">
      <!-- 顶部：题号 + 倒计时 -->
      <div class="quiz-header">
        <span class="quiz-title">
          题目 {{ currentIndex + 1 }} / {{ questions.length }}
        </span>
        <el-tag type="danger" effect="plain" class="quiz-timer">
          倒计时 {{ formattedTime }}
        </el-tag>
      </div>

      <!-- 题干 -->
      <div class="quiz-body">
        <div class="quiz-question">
          {{ currentQuestion?.content || '加载中...' }}
        </div>

        <!-- 选项列表，左对齐 -->
        <el-radio-group
            v-model="selectedAnswer"
            class="quiz-option-group"
        >
          <el-radio
              v-for="opt in options"
              :key="opt.label"
              :label="opt.label"
              class="quiz-option"
          >
            {{ opt.label }}. {{ opt.text }}
          </el-radio>
        </el-radio-group>
      </div>

      <!-- 按钮区域 -->
      <div class="btn-group">
        <el-button
            :disabled="currentIndex === 0"
            @click="prev"
        >
          上一题
        </el-button>
        <el-button
            type="primary"
            @click="nextOrSubmit"
        >
          {{ isLast ? '提交答案' : '下一题' }}
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'
import Navbar from '@/components/Navbar.vue'

// 后端 Question 实体对应字段
interface Question {
  id: number
  content: string
  optionA?: string
  optionB?: string
  optionC?: string
  optionD?: string
}

// 前端用的选项结构
interface Option {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

// 提交时 DTO 中的单题结构
interface AnswerDTO {
  questionId: number
  userAnswer: string
}

// -------------------- state --------------------
const questions = ref<Question[]>([])
const currentIndex = ref(0)
const selectedAnswer = ref<string | null>(null)
const answers = ref<AnswerDTO[]>([])

// 倒计时初始 600 秒（10 分钟）
const remainingTime = ref(600)
let timerId: number | null = null

const router = useRouter()

// -------------------- computed --------------------
const currentQuestion = computed(() => questions.value[currentIndex.value])
const isLast = computed(() => currentIndex.value === questions.value.length - 1)
const options = computed(() => {
  const q = currentQuestion.value
  if (!q) return []
  return [
    { label: 'A', text: q.optionA || '' },
    { label: 'B', text: q.optionB || '' },
    { label: 'C', text: q.optionC || '' },
    { label: 'D', text: q.optionD || '' },
  ].filter(o => o.text)
})
// 新增：格式化分钟:秒
const formattedTime = computed(() => {
  const m = Math.floor(remainingTime.value / 60)
  const s = remainingTime.value % 60
  const mm = String(m).padStart(2, '0')
  const ss = String(s).padStart(2, '0')
  return `${mm}:${ss}`
})

// -------------------- methods --------------------
async function loadQuestions() {
  try {
    const { data } = await request.get<Question[]>('/questions/daily')
    questions.value = data
  } catch (err) {
    console.error('获取题目失败', err)
    ElMessage.error('获取题目失败')
  }
}

function startTimer() {
  timerId = window.setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--
    } else {
      submitAnswers()
    }
  }, 1000)
}

function stopTimer() {
  if (timerId !== null) {
    clearInterval(timerId)
    timerId = null
  }
}

function saveCurrentAnswer() {
  const q = currentQuestion.value
  if (!q) return
  const exist = answers.value.find(a => a.questionId === q.id)
  const payload: AnswerDTO = {
    questionId: q.id,
    userAnswer: selectedAnswer.value || ''
  }
  if (exist) {
    exist.userAnswer = payload.userAnswer
  } else {
    answers.value.push(payload)
  }
}

function restoreAnswer() {
  const q = currentQuestion.value
  if (!q) {
    selectedAnswer.value = null
    return
  }
  const exist = answers.value.find(a => a.questionId === q.id)
  selectedAnswer.value = exist ? exist.userAnswer : null
}

function prev() {
  saveCurrentAnswer()
  if (currentIndex.value > 0) {
    currentIndex.value--
    restoreAnswer()
  }
}

function nextOrSubmit() {
  saveCurrentAnswer()
  if (isLast.value) {
    submitAnswers()
  } else {
    currentIndex.value++
    restoreAnswer()
  }
}

async function submitAnswers() {
  stopTimer()
  try {
    const payload = { answers: answers.value }
    const { data } = await request.post<string>('/quiz_result/submit', payload)
    ElMessage.success(data)
    router.push({ name: 'daily-quiz' })
  } catch (err) {
    console.error('提交失败', err)
    ElMessage.error('提交失败')
  }
}

onMounted(() => {
  loadQuestions()
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<style scoped>
.quiz-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.quiz-card {
  max-width: 600px;
  width: 100%;
  margin: auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.quiz-title {
  font-size: 20px;
  font-weight: bold;
}

.quiz-timer {
  font-size: 14px;
}

.quiz-body {
  margin-bottom: 24px;
}

.quiz-question {
  font-size: 16px;
  margin-bottom: 16px;
}

.quiz-option-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.quiz-option {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.el-button {
  width: 120px;
}
</style>
