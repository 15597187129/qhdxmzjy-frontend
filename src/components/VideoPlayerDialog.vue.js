const props = defineProps();
const emit = defineEmits();
function onUpdateVisible(val) {
    console.log('[Dialog] 收到更新：visible =', val);
    emit('update:visible', val);
}
function onOpen() {
    console.log('[Dialog] 打开弹窗，当前 video =', props.video);
}
function onClose() {
    console.log('[Dialog] 关闭弹窗');
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign(Object.assign({ 'onUpdate:visible': {} }, { 'onOpen': {} }), { 'onClose': {} }), { visible: (__VLS_ctx.visible), width: "70%", top: "5vh", title: "视频播放", showClose: (true) })));
const __VLS_2 = __VLS_1(Object.assign(Object.assign(Object.assign({ 'onUpdate:visible': {} }, { 'onOpen': {} }), { 'onClose': {} }), { visible: (__VLS_ctx.visible), width: "70%", top: "5vh", title: "视频播放", showClose: (true) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    'onUpdate:visible': (__VLS_ctx.onUpdateVisible)
};
const __VLS_8 = {
    onOpen: (__VLS_ctx.onOpen)
};
const __VLS_9 = {
    onClose: (__VLS_ctx.onClose)
};
var __VLS_10 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "video-container" }));
if (__VLS_ctx.video && __VLS_ctx.video.videoUrl) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.video, __VLS_intrinsicElements.video)({
        src: (__VLS_ctx.video.videoUrl),
        controls: true,
        autoplay: true,
    });
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "empty" }));
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['video-container']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            onUpdateVisible: onUpdateVisible,
            onOpen: onOpen,
            onClose: onClose,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
