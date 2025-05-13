var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reactive, readonly } from 'vue';
import request from '@/utils/request'; // 如果放在 utils 目录，改成 '@/utils/request'
const state = reactive({
    user: null,
    isLoggedIn: false
});
export function checkAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // ✅ 正确：请求到 /api/user/profile
            const resp = yield request.get('/user/profile');
            state.user = resp.data;
            state.isLoggedIn = true;
        }
        catch (_a) {
            state.user = null;
            state.isLoggedIn = false;
        }
    });
}
export function useAuth() {
    return { state: readonly(state), checkAuth };
}
