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

    <!-- 折叠「加入讨论」区 -->
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
              :loading="joining"
              size="small"
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
        router={false}
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

interface Group { id: number; title: string; description?: string; joined?: boolean }

const props = defineProps<{ selected: number | null }>()
// 正确定义 emits 签名，第二个参数是 number
const emit = defineEmits<{
  (e: 'joined', id: number): void
  (e: 'update:selected', id: number): void
}>()

const groups     = ref<Group[]>([])
const filter     = ref('')
const joinId     = ref('')
const joining    = ref(false)
const joinActive = ref(['1'])

// 加载已加入组
async function loadGroups() {
  try {
    const res = await request.get<Group[]>('/discussions/my')
    groups.value = res.data
  } catch (e: any) {
    ElNotification.error(e.response?.data?.message || '加载讨论组失败')
  }
}

// 过滤
const filteredGroups = computed(() => {
  if (!filter.value.trim()) return groups.value
  const key = filter.value.trim().toLowerCase()
  return groups.value.filter(g => g.title.toLowerCase().includes(key))
})

// 加入
async function onJoin() {
  if (!joinId.value.trim()) return
  joining.value = true
  try {
    await request.post('/discussions/join', { discussionId: +joinId.value })
    ElNotification.success('加入成功')
    await loadGroups()
    emit('joined', +joinId.value)  // 不再报类型错
    joinId.value = ''
  } catch (e: any) {
    ElNotification.error(e.response?.data?.message || '加入失败')
  } finally {
    joining.value = false
  }
}

// 选中
function select(id: string) {
  emit('update:selected', +id)     // 不再报类型错
}

onMounted(loadGroups)
watch(() => props.selected, loadGroups)
</script>

<style scoped>
.group-list-card {
  padding: 16px;
  border-radius: 8px;
}
.panel-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
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
