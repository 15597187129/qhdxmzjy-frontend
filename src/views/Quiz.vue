<!-- src/views/Quiz.vue -->
<template>
  <Navbar />

  <div class="daily-quiz-page">
    <!-- 顶部概览卡片 -->
    <el-card class="overview-card" shadow="hover">
      <h2 class="overview-title">每日答题</h2>
      <p class="overview-subtitle">每日 10 道题，巩固民族团结进步教育知识！</p>
    </el-card>

    <!-- 顶部引导文字 -->
    <div class="intro-text">
      每一次挑战，都是一次成长。点击下方「开始答题」按钮，立即开启今日答题之旅！
    </div>

    <!-- 两个子 Tab（已移除“我的记录”） -->
    <el-card class="quiz-tabs" shadow="never">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="今日答题" name="daily" />
        <el-tab-pane label="排行榜"   name="ranking" />
      </el-tabs>

      <div class="tab-content">
        <!-- 今日答题 -->
        <div v-if="activeTab === 'daily'" class="daily-content">
          <el-button type="primary" size="large" @click="startQuiz">
            开始答题
          </el-button>
        </div>

        <!-- 排行榜 -->
        <div v-if="activeTab === 'ranking'" class="ranking-content">
          <el-card class="quiz-card" shadow="hover">
            <div class="table-container">
              <el-table
                  :data="uniqueRanking"
                  stripe
                  :loading="loadingRanking"
                  style="width: 100%;"
              >
                <template #empty>
                  <el-empty description="暂无数据" />
                </template>
                <el-table-column prop="username" label="用户名" />
                <el-table-column prop="score"    label="正确数" width="100" />
              </el-table>
            </div>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import request from '@/utils/request'

interface RankingItem {
  username: string
  score: number
}

const router         = useRouter()
const activeTab      = ref<'daily'|'ranking'>('daily')
const ranking        = ref<RankingItem[]>([])
const loadingRanking = ref(false)

// 拉取排行榜数据
async function loadRanking() {
  loadingRanking.value = true
  try {
    const { data } = await request.get<RankingItem[]>('/quiz_result/ranking/today')
    ranking.value = data
  } catch (e) {
    console.error('拉取排行榜失败', e)
  } finally {
    loadingRanking.value = false
  }
}

// 只保留每个用户名的第一条记录
const uniqueRanking = computed(() => {
  const seen = new Set<string>()
  return ranking.value.filter(item => {
    if (seen.has(item.username)) return false
    seen.add(item.username)
    return true
  })
})

// Tab 切换时加载对应数据
watch(activeTab, tab => {
  if (tab === 'ranking') loadRanking()
})

// 跳转到答题页面
function startQuiz() {
  router.push({ name: 'QuizPlay' })
}
</script>

<style scoped>
.daily-quiz-page {
  margin-top: 60px;
  padding: 24px 0;
  background: #f6f8fb;
}

/* 顶部卡片 */
.overview-card {
  max-width: 800px;
  margin: 0 auto 24px;
  padding: 24px;
}
.overview-title {
  margin: 0;
  color: #0a2d88;
  font-size: 24px;
}
.overview-subtitle {
  margin: 8px 0 0;
  color: #666;
}

/* 引导文字 */
.intro-text {
  max-width: 800px;
  margin: 0 auto 32px;
  text-align: center;
  font-size: 16px;
  color: #444;
}

/* Tab 容器 */
.quiz-tabs {
  max-width: 820px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

/* Tab 内容 */
.tab-content {
  margin-top: 16px;
}
.daily-content {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
.ranking-content {
  max-width: 780px;
  margin: 0 auto;
}

/* 卡片化表格 */
.quiz-card {
  max-width: 780px;
  margin: 16px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.table-container {
  margin-top: 16px;
}

/* 空数据样式 */
.el-empty {
  margin: 40px 0;
}
</style>
