<template>
  <div class="input-area">
    <el-input
        v-model="content"
        type="textarea"
        :rows="2"
        placeholder="输入消息..."
        class="input-box"
    />
    <el-button
        class="send-btn"
        type="primary"
        :disabled="!content.trim() || loading"
        :loading="loading"
        @click="onSend"
    >
      发送
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

// 接收父组件传进来的 loading prop
const props = defineProps<{ loading: boolean }>()
// 解构出来 template 可直接使用
const loading = props.loading

// 定义向外抛出的 send 事件
const emit = defineEmits<{
  (e: 'send', content: string): void
}>()

const content = ref('')

function onSend() {
  const txt = content.value.trim()
  if (!txt) return
  emit('send', txt)
  content.value = ''
}
</script>

<style scoped>
.input-area {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background: #fff;
  height: 100%;
  box-sizing: border-box;
}
.input-box {
  flex: 1;
}
.send-btn {
  flex: 0 0 80px;
}
.send-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
