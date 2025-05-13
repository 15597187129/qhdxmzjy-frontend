<template>
  <el-dialog
      :visible="visible"
      width="70%"
      top="5vh"
      title="视频播放"
      :show-close="true"
      @update:visible="onUpdateVisible"
      @open="onOpen"
      @close="onClose"
  >
    <div class="video-container">
      <video
          v-if="video && video.videoUrl"
          :src="video.videoUrl"
          controls
          autoplay
      >
        您的浏览器不支持播放该视频。
      </video>
      <div v-else class="empty">未选择视频</div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
// 接收 props
const props = defineProps<{
  visible: boolean
  video: {
    id: number
    title: string
    description?: string
    videoUrl: string
    coverUrl?: string
  } | null
}>()

// 触发 update:visible
const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
}>()

function onUpdateVisible(val: boolean) {
  console.log('[Dialog] 收到更新：visible =', val)
  emit('update:visible', val)
}
function onOpen() {
  console.log('[Dialog] 打开弹窗，当前 video =', props.video)
}
function onClose() {
  console.log('[Dialog] 关闭弹窗')
}
</script>

<style scoped>
.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}
video {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
}
.empty {
  text-align: center;
  color: #999;
  padding: 40px 0;
}
</style>
