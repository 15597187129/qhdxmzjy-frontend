<!-- 文件路径：src/views/TeacherLayout.vue -->
<template>
  <div class="teacher-layout">
    <!-- 顶部导航 -->
    <TeacherNavbar />

    <div class="body">
      <!-- 左侧（Sidebar） -->
      <aside class="sidebar">
        <ul class="menu">
          <!-- 控制面板 -->
          <li :class="{ active: current === 'dashboard' }">
            <router-link to="/teacher/dashboard" class="menu-link">
              <Icon icon="mdi:view-dashboard" class="icon" />
              <span class="label">控制面板</span>
            </router-link>
          </li>

          <!-- 讨论管理（二级菜单） -->
          <li :class="{ active: current === 'discussions', open: discussionsOpen }">
            <div class="menu-link discussions-parent" @click="toggleDiscussions">
              <Icon icon="mdi:comment-multiple-outline" class="icon" />
              <span class="label">讨论管理</span>
              <Icon icon="mdi:chevron-down" class="chevron" />
            </div>
            <ul class="submenu" v-if="discussionsOpen">
              <li :class="{ active: route.path === '/teacher/discussions' }">
                <router-link to="/teacher/discussions">我的讨论组</router-link>
              </li>
              <li :class="{ active: route.path === '/teacher/discussions/create' }">
                <router-link to="/teacher/discussions/create">创建讨论组</router-link>
              </li>
              <li :class="{ active: route.path.startsWith('/teacher/discussions/members') }">
                <router-link to="/teacher/discussions/members">成员管理</router-link>
              </li>
              <li :class="{ active: route.path.startsWith('/teacher/discussions/messages') }">
                <router-link to="/teacher/discussions/messages">发言管理</router-link>
              </li>
            </ul>
          </li>

          <!-- 题库管理（二级菜单） -->
          <li :class="{ active: current === 'questions', open: questionsOpen }">
            <div class="menu-link questions-parent" @click="toggleQuestions">
              <Icon icon="mdi:format-list-bulleted" class="icon" />
              <span class="label">题库管理</span>
              <Icon icon="mdi:chevron-down" class="chevron" />
            </div>
            <ul class="submenu" v-if="questionsOpen">
              <li :class="{ active: route.path === '/teacher/import' }">
                <router-link to="/teacher/import">Excel 导入题库</router-link>
              </li>
              <li :class="{ active: route.path.startsWith('/teacher/questions') }">
                <router-link to="/teacher/questions">查看题目</router-link>
              </li>
              <li :class="{ active: route.path === '/teacher/ranking' }">
                <router-link to="/teacher/ranking">排行榜</router-link>
              </li>
            </ul>
          </li>

          <!-- 视频管理（二级菜单） -->
          <li :class="{ active: current === 'videos', open: videosOpen }">
            <div class="menu-link videos-parent" @click="toggleVideos">
              <Icon icon="mdi:video-outline" class="icon" />
              <span class="label">视频管理</span>
              <Icon icon="mdi:chevron-down" class="chevron" />
            </div>
            <ul class="submenu" v-if="videosOpen">
              <li :class="{ active: route.path === '/teacher/videos' }">
                <router-link to="/teacher/videos">我的视频</router-link>
              </li>
              <li :class="{ active: route.path === '/teacher/videos/upload' }">
                <router-link to="/teacher/videos/upload">上传视频</router-link>
              </li>
            </ul>
          </li>

          <!-- 全景图片管理（二级菜单） -->
          <li :class="{ active: current === 'panorama', open: panoramaOpen }">
            <div class="menu-link panorama-parent" @click="togglePanorama">
              <Icon icon="mdi:image" class="icon" />
              <span class="label">全景图片管理</span>
              <Icon icon="mdi:chevron-down" class="chevron" />
            </div>
            <ul class="submenu" v-if="panoramaOpen">
              <li :class="{ active: route.path === '/teacher/panorama' }">
                <router-link to="/teacher/panorama">我的全景图片</router-link>
              </li>
              <li :class="{ active: route.path === '/teacher/panorama/upload' }">
                <router-link to="/teacher/panorama/upload">上传全景图片</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <!-- 右侧主内容 -->
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import TeacherNavbar from '@/components/TeacherNavbar.vue'
import { Icon } from '@iconify/vue'

const route = useRoute()

// 一级菜单激活判定
const current = computed(() => {
  const p = route.path
  if (p === '/teacher/dashboard') return 'dashboard'
  if (p.startsWith('/teacher/discussions')) return 'discussions'
  if (p.startsWith('/teacher/videos')) return 'videos'
  if (p.startsWith('/teacher/panorama')) return 'panorama'
  if (p === '/teacher/import' || p.startsWith('/teacher/questions') || p === '/teacher/ranking')
    return 'questions'
  return ''
})

// 菜单状态管理
const discussionsOpen = ref(false)
const questionsOpen = ref(false)
const videosOpen = ref(false)
const panoramaOpen = ref(false)

// 切换菜单展开状态
function toggleDiscussions() {
  discussionsOpen.value = !discussionsOpen.value
}
function toggleQuestions() {
  questionsOpen.value = !questionsOpen.value
}
function toggleVideos() {
  videosOpen.value = !videosOpen.value
}
function togglePanorama() {
  panoramaOpen.value = !panoramaOpen.value
}

watch(current, val => {
  discussionsOpen.value = (val === 'discussions')
  questionsOpen.value = (val === 'questions')
  videosOpen.value = (val === 'videos')
  panoramaOpen.value = (val === 'panorama')
})
</script>



<style scoped lang="scss">
.teacher-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 200px;
  background: #f5f7fa;
  padding-top: 16px;
  box-sizing: border-box;
}

.menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  position: relative;
}

.menu-link {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  color: #333;
  text-decoration: none;
  transition: background 0.2s, font-weight 0.2s;
}

.menu-link .icon {
  font-size: 24px;
  flex-shrink: 0;
}

.menu-link .label {
  margin-left: 12px;
  flex: 1;
}

.discussions-parent,
.questions-parent {
  cursor: pointer;
}

.chevron {
  margin-left: auto;
  transition: transform 0.2s;
}
li.open .chevron {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  margin: 0;
  padding: 0 0 0 32px;
  background: #eef2f7;
}
.submenu li {
  line-height: 40px;
}
.submenu li a {
  color: #555;
  display: block;
  padding-left: 8px;
  text-decoration: none;
}
.submenu li.active a {
  font-weight: 600;
  color: #0a66c2;
}

.menu-link:hover,
.submenu li a:hover {
  background: #e0f0ff;
}

.menu li.active > .menu-link {
  background: #fff;
  font-weight: 600;
}
.menu li.active::before {
  content: '';
  position: absolute;
  left: 0; top: 4px; bottom: 4px;
  width: 4px;
  background: #ffd700;
  border-radius: 2px;
}

.main-content {
  flex: 1;
  background: #f6f8fb;
  overflow-y: auto;
  padding: 32px;
}
</style>
