import { reactive, readonly } from 'vue'
import request from '@/utils/request'   // 如果放在 utils 目录，改成 '@/utils/request'

interface User {
    id: number
    username: string
    role: string
    // …其他字段按后端 Entity 补充
}

const state = reactive({
    user: null as User | null,
    isLoggedIn: false
})

export async function checkAuth() {
    try {
// ✅ 正确：请求到 /api/user/profile
        const resp = await request.get<User>('/user/profile')
        state.user = resp.data
        state.isLoggedIn = true
    } catch {
        state.user = null
        state.isLoggedIn = false
    }
}

export function useAuth() {
    return { state: readonly(state), checkAuth }
}
