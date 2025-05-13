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
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import request from '@/utils/request';
const images = ref([]);
const router = useRouter();
// 加载全景图片列表
function loadPanoramas() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield request.get('/panorama/list');
            images.value = res.data;
        }
        catch (error) {
            console.error('加载全景图片失败', error);
        }
    });
}
function viewPanorama(id) {
    router.push(`/panorama/view/${id}`);
}
onMounted(() => {
    loadPanoramas();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "panorama-container" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "page-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "page-subtitle" }));
const __VLS_3 = {}.ElRow;
/** @type {[typeof __VLS_components.ElRow, typeof __VLS_components.elRow, typeof __VLS_components.ElRow, typeof __VLS_components.elRow, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign({ gutter: (20) }, { class: "panorama-list" })));
const __VLS_5 = __VLS_4(Object.assign({ gutter: (20) }, { class: "panorama-list" }), ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
for (const [image] of __VLS_getVForSourceType((__VLS_ctx.images))) {
    const __VLS_7 = {}.ElCol;
    /** @type {[typeof __VLS_components.ElCol, typeof __VLS_components.elCol, typeof __VLS_components.ElCol, typeof __VLS_components.elCol, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        key: (image.id),
        span: (8),
    }));
    const __VLS_9 = __VLS_8({
        key: (image.id),
        span: (8),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_10.slots.default;
    const __VLS_11 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(Object.assign({ class: "panorama-item" }, { shadow: "hover" })));
    const __VLS_13 = __VLS_12(Object.assign({ class: "panorama-item" }, { shadow: "hover" }), ...__VLS_functionalComponentArgsRest(__VLS_12));
    __VLS_14.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "panorama-info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(Object.assign({ class: "panorama-title" }));
    (image.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "panorama-desc" }));
    (image.description);
    const __VLS_15 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(Object.assign({ 'onClick': {} }, { type: "primary", size: "small" })));
    const __VLS_17 = __VLS_16(Object.assign({ 'onClick': {} }, { type: "primary", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_16));
    let __VLS_19;
    let __VLS_20;
    let __VLS_21;
    const __VLS_22 = {
        onClick: (...[$event]) => {
            __VLS_ctx.viewPanorama(image.id);
        }
    };
    __VLS_18.slots.default;
    var __VLS_18;
    var __VLS_14;
    var __VLS_10;
}
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['panorama-container']} */ ;
/** @type {__VLS_StyleScopedClasses['page-title']} */ ;
/** @type {__VLS_StyleScopedClasses['page-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-list']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-item']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-info']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-title']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-desc']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            images: images,
            viewPanorama: viewPanorama,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
