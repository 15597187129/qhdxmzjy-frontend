import { ref, onMounted, onUnmounted } from 'vue';
import img1 from '@/assets/images/carousel1.jpg';
import img2 from '@/assets/images/carousel2.jpg';
import img3 from '@/assets/images/carousel3.jpg';
import img4 from '@/assets/images/carousel4.jpg';
const images = [img1, img2, img3, img4];
const currentIndex = ref(0);
let timer;
const next = () => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
};
const prev = () => {
    currentIndex.value =
        (currentIndex.value - 1 + images.length) % images.length;
};
const goTo = (i) => {
    currentIndex.value = i;
};
onMounted(() => {
    timer = window.setInterval(next, 5000);
});
onUnmounted(() => {
    clearInterval(timer);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['dots']} */ ;
/** @type {__VLS_StyleScopedClasses['dots']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "carousel-wrapper" }));
const __VLS_0 = {}.transition;
/** @type {[typeof __VLS_components.Transition, typeof __VLS_components.transition, typeof __VLS_components.Transition, typeof __VLS_components.transition, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
    mode: "out-in",
}));
const __VLS_2 = __VLS_1({
    name: "fade",
    mode: "out-in",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign(Object.assign({ src: (__VLS_ctx.images[__VLS_ctx.currentIndex]), key: (__VLS_ctx.currentIndex) }, { class: "carousel-image" }), { alt: "宣传图" }));
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.prev) }, { class: "arrow prev" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign({ onClick: (__VLS_ctx.next) }, { class: "arrow next" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "dots" }));
for (const [img, i] of __VLS_getVForSourceType((__VLS_ctx.images))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.goTo(i);
        } }, { key: (i) }), { class: ({ active: i === __VLS_ctx.currentIndex }) }));
}
/** @type {__VLS_StyleScopedClasses['carousel-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['carousel-image']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['prev']} */ ;
/** @type {__VLS_StyleScopedClasses['arrow']} */ ;
/** @type {__VLS_StyleScopedClasses['next']} */ ;
/** @type {__VLS_StyleScopedClasses['dots']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            images: images,
            currentIndex: currentIndex,
            next: next,
            prev: prev,
            goTo: goTo,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
