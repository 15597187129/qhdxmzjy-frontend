var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import Navbar from '@/components/Navbar.vue';
// 只加载 Pannellum 的打包文件和样式，不再从它的包里 import
import 'pannellum/build/pannellum.js';
import 'pannellum/build/pannellum.css';
const route = useRoute();
const router = useRouter();
const panoramaId = route.params.id;
const panoramaTitle = ref('全景图片');
function goBack() {
    router.push('/panorama');
}
function initViewer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield request.get(`/panorama/${panoramaId}`);
            if (!data.imagePath) {
                ElMessage.error('全景图数据不完整');
                return;
            }
            // 动态拼协议，兼容 http/https
            const { protocol, hostname } = window.location;
            const url = `${protocol}//${hostname}:8888${data.imagePath}`;
            panoramaTitle.value = data.title || '全景图片';
            // 使用全局的 window.pannellum.viewer
            window.pannellum.viewer('panoramaContainer', {
                type: 'equirectangular',
                panorama: url,
                autoLoad: true,
                showZoomCtrl: true,
                showFullscreenCtrl: true,
                mouseZoom: true,
                draggable: true,
            });
        }
        catch (err) {
            console.error(err);
            ElMessage.error('加载全景图失败，请稍后重试');
        }
    });
}
onMounted(initViewer);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['back-button']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "panorama-page" }));
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "panorama-wrapper" }));
const __VLS_3 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign({ class: "panorama-card" }, { shadow: "hover" })));
const __VLS_5 = __VLS_4(Object.assign({ class: "panorama-card" }, { shadow: "hover" }), ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "viewer-header" }));
const __VLS_7 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7(Object.assign(Object.assign({ 'onClick': {} }, { type: "primary", icon: "el-icon-arrow-left" }), { class: "back-button" })));
const __VLS_9 = __VLS_8(Object.assign(Object.assign({ 'onClick': {} }, { type: "primary", icon: "el-icon-arrow-left" }), { class: "back-button" }), ...__VLS_functionalComponentArgsRest(__VLS_8));
let __VLS_11;
let __VLS_12;
let __VLS_13;
const __VLS_14 = {
    onClick: (__VLS_ctx.goBack)
};
__VLS_10.slots.default;
var __VLS_10;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "title" }));
(__VLS_ctx.panoramaTitle);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ id: "panoramaContainer" }, { class: "pannellum-container" }));
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['panorama-page']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-card']} */ ;
/** @type {__VLS_StyleScopedClasses['viewer-header']} */ ;
/** @type {__VLS_StyleScopedClasses['back-button']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['pannellum-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            panoramaTitle: panoramaTitle,
            goBack: goBack,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
