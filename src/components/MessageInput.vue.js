import { ref, defineProps, defineEmits } from 'vue';
const props = defineProps();
// 解构出来 template 可直接使用
const loading = props.loading;
const emit = defineEmits();
const content = ref('');
function onSend() {
    const txt = content.value.trim();
    if (!txt)
        return;
    emit('send', txt);
    content.value = '';
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "input-area" }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ modelValue: (__VLS_ctx.content), type: "textarea", rows: (2), placeholder: "输入消息..." }, { class: "input-box" })));
const __VLS_2 = __VLS_1(Object.assign({ modelValue: (__VLS_ctx.content), type: "textarea", rows: (2), placeholder: "输入消息..." }, { class: "input-box" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
const __VLS_4 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign(Object.assign({ 'onClick': {} }, { class: "send-btn" }), { type: "primary", disabled: (!__VLS_ctx.content.trim() || __VLS_ctx.loading), loading: (__VLS_ctx.loading) })));
const __VLS_6 = __VLS_5(Object.assign(Object.assign({ 'onClick': {} }, { class: "send-btn" }), { type: "primary", disabled: (!__VLS_ctx.content.trim() || __VLS_ctx.loading), loading: (__VLS_ctx.loading) }), ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onClick: (__VLS_ctx.onSend)
};
__VLS_7.slots.default;
var __VLS_7;
/** @type {__VLS_StyleScopedClasses['input-area']} */ ;
/** @type {__VLS_StyleScopedClasses['input-box']} */ ;
/** @type {__VLS_StyleScopedClasses['send-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            loading: loading,
            content: content,
            onSend: onSend,
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
