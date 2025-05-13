<template>
  <div>
    <h3 class="text-lg font-semibold mb-2">成员列表</h3>
    <ul>
      <li
          v-for="u in members"
          :key="u.id"
          class="py-1 border-b last:border-none"
      >
        {{ u.username }} ({{ u.role }})
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Member { id: number; username: string; role: string }

const members = ref<Member[]>([
  { id: 1, username: 't001', role: 'teacher' },
  { id: 2, username: 's001', role: 'student' }
])
</script>
