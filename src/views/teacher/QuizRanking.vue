<!-- src/views/teacher/QuizRanking.vue -->
<template>
  <el-card class="ranking-card">
    <h2>今日排行榜</h2>
    <el-table
        :data="ranking"
        stripe
        style="width: 100%;"
        empty-text="暂无数据"
    >
      <!-- 名次 -->
      <el-table-column
          label="名次"
          width="80"
      >
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <!-- 用户名 -->
      <el-table-column
          prop="username"
          label="用户名"
      />

      <!-- 分数 -->
      <el-table-column
          prop="score"
          label="分数"
          width="100"
      />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/utils/request'

interface RankingDTO {
  userId: number
  username: string
  score: number
}

const ranking = ref<RankingDTO[]>([])

async function loadRanking() {
  try {
    // 这里的 /quiz_result/ranking/today 会被代理到 http://你的后端:8888/api/quiz_result/ranking/today
    const { data } = await request.get<RankingDTO[]>('/quiz_result/ranking/today')
    ranking.value = data
  } catch (err) {
    console.error('获取排行榜失败', err)
  }
}

onMounted(loadRanking)
</script>

<style scoped>
.ranking-card {
  padding: 24px;
}
.ranking-card h2 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #333;
}
</style>
