var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import ImageCarousel from '@/components/ImageCarousel.vue';
import { checkAuth, useAuth } from '@/components/useAuth';
const auth = useAuth();
const router = useRouter();
const showToast = ref(false);
onMounted(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // 检查登录态
    yield checkAuth();
    if (!auth.state.isLoggedIn) {
        window.location.href = '/login';
        return;
    }
    // 拿到当前用户角色
    const role = ((_a = auth.state.user) === null || _a === void 0 ? void 0 : _a.role) || '';
    // 首次加载时带欢迎参数跳转
    if (role === 'student') {
        router.push({ path: '/home', query: { welcome: '1' } });
    }
    else if (role === 'teacher') {
        router.push({ path: '/teacher/dashboard', query: { welcome: '1' } });
    }
    else if (role === 'admin') {
        router.push({ path: '/admin/dashboard', query: { welcome: '1' } });
    }
}));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "home-page" }));
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar(Object.assign({ class: "home-navbar" })));
const __VLS_1 = __VLS_0(Object.assign({ class: "home-navbar" }), ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.section, __VLS_intrinsicElements.section)(Object.assign({ class: "banner-section" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "carousel-container" }));
/** @type {[typeof ImageCarousel, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(ImageCarousel, new ImageCarousel({}));
const __VLS_4 = __VLS_3({}, ...__VLS_functionalComponentArgsRest(__VLS_3));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "slogan" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.br)({});
if (__VLS_ctx.showToast) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "welcome-toast" }));
    ((_a = __VLS_ctx.auth.state.user) === null || _a === void 0 ? void 0 : _a.username);
}
/** @type {__VLS_StyleScopedClasses['home-page']} */ ;
/** @type {__VLS_StyleScopedClasses['home-navbar']} */ ;
/** @type {__VLS_StyleScopedClasses['banner-section']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-container']} */ ;
/** @type {__VLS_StyleScopedClasses['slogan']} */ ;
/** @type {__VLS_StyleScopedClasses['welcome-toast']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            ImageCarousel: ImageCarousel,
            auth: auth,
            showToast: showToast,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
