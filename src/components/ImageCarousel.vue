<template>
  <div class="carousel-wrapper">
    <transition name="fade" mode="out-in">
      <img
          :src="images[currentIndex]"
          :key="currentIndex"
          class="carousel-image"
          alt="宣传图"
      />
    </transition>
    <!-- 左右箭头 -->
    <button class="arrow prev" @click="prev">‹</button>
    <button class="arrow next" @click="next">›</button>
    <!-- 圆点指示 -->
    <div class="dots">
      <span
          v-for="(img, i) in images"
          :key="i"
          @click="goTo(i)"
          :class="{ active: i === currentIndex }"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import img1 from '@/assets/images/carousel1.jpg'
import img2 from '@/assets/images/carousel2.jpg'
import img3 from '@/assets/images/carousel3.jpg'
import img4 from '@/assets/images/carousel4.jpg'

const images = [img1, img2, img3, img4]
const currentIndex = ref(0)
let timer: number

const next = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}
const prev = () => {
  currentIndex.value =
      (currentIndex.value - 1 + images.length) % images.length
}
const goTo = (i: number) => {
  currentIndex.value = i
}

onMounted(() => {
  timer = window.setInterval(next, 5000)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 90vh;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 箭头 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(10, 45, 136, 0.5);
  color: #fff;
  border: none;
  font-size: 2rem;
  width: 40px;
  height: 40px;
  cursor: pointer;
  backdrop-filter: blur(5px);
}
.prev {
  left: 1rem;
}
.next {
  right: 1rem;
}

/* 圆点 */
.dots {
  position: absolute;
  bottom: 1.5rem;
  width: 100%;
  text-align: center;
}
.dots span {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background: rgba(255,255,255,0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
}
.dots span.active {
  background: #ffd700;
}
</style>
