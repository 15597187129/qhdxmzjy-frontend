<template>
  <el-card class="group-list-card">
    <h2 class="panel-title">我的讨论组</h2>

    <!-- 搜索框 -->
    <el-input
        v-model="filter"
        placeholder="搜索讨论组"
        clearable
        size="small"
        class="search-input"
    />

    <!-- 折叠加入区 -->
    <el-collapse v-model="joinActive" class="join-collapse">
      <el-collapse-item name="1" title="加入讨论组">
        <div class="join-group">
          <el-input
              v-model="joinId"
              placeholder="输入讨论组 ID"
              size="small"
              class="join-input"
          />
          <el-button
              type="primary"
              size="small"
              :loading="joining"
              @click="onJoin"
          >加入</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <!-- 列表 -->
    <el-menu
        class="group-menu"
        :default-active="String(selected)"
        @select="select"
        :router="false"
    >
      <el-menu-item
          v-for="g in filteredGroups"
          :key="g.id"
          :index="String(g.id)"
      >
        {{ g.title }}
      </el-menu-item>
    </el-menu>

    <div v-if="filteredGroups.length === 0" class="empty">
      无匹配结果
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ElNotification } from 'element-plus'
import request from '@/utils/request'

interface Group { id: number; title: string }

const props = defineProps<{ selected: number|null }>()
const emit  = defineEmits(['update:selected', 'joined'] as const)

const groups     = ref<Group[]>([])
const filter     = ref('')
const joinId     = ref('')
const joining    = ref(false)
const joinActive = ref(['1'])

// 加载列表
async function loadGroups() {
  try {
    const res = await request.get<Group[]>('/discussions/my')
    groups.value = res.data
  } catch (e: any) {
    ElNotification.error(e.response?.data?.message || '加载讨论组失败')
  }
}

// 搜索过滤
const filteredGroups = computed(() => {
  if (!filter.value.trim()) return groups.value
  const key = filter.value.toLowerCase()
  return groups.value.filter(g =>
      g.title.toLowerCase().includes(key)
  )
})

// 加入
async function onJoin() {
  if (!joinId.value.trim()) return
  joining.value = true
  try {
    await request.post('/discussions/join', { discussionId: +joinId.value })
    ElNotification.success('加入成功')
    await loadGroups()
    emit('joined', +joinId.value)
    joinId.value = ''
  } catch (e: any) {
    ElNotification.error(e.response?.data?.message || '加入失败')
  } finally {
    joining.value = false
  }
}

// 选中
function select(id: string) {
  emit('update:selected', +id)
}

onMounted(loadGroups)
watch(() => props.selected, loadGroups)
</script>

<style scoped>
.group-list-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px;
  border-radius: 8px;
}
.panel-title {
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 600;
}
.search-input {
  margin-bottom: 12px;
}
.join-collapse {
  margin-bottom: 16px;
}
.join-group {
  display: flex;
  gap: 8px;
}
.join-input {
  flex: 1;
}
.group-menu {
  flex: 1;
  overflow-y: auto;
  border-right: none;
}
.group-menu .el-menu-item {
  border-left: 4px solid transparent;
  transition: all .2s;
}
.group-menu .el-menu-item.is-active {
  background: #e6f7ff !important;
  border-left-color: #ffd700 !important;
}
.group-menu .el-menu-item:hover {
  background: #f0faff;
}
.empty {
  padding: 12px;
  text-align: center;
  color: #999;
}
</style>
