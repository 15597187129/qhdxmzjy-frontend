var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import request from '@/utils/request';
const props = defineProps();
const emit = defineEmits();
const content = ref('');
const sending = ref(false);
function onSend() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (props.groupId <= 0 || !content.value.trim())
            return;
        sending.value = true;
        try {
            const r = yield request.post('/discussions/post', {
                discussionId: props.groupId,
                content: content.value.trim()
            });
            emit('sent', r.data);
            content.value = '';
        }
        catch (e) {
            ElNotification.error(((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '发送失败');
        }
        finally {
            sending.value = false;
        }
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "chat-input" }));
const __VLS_0 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onKeyup': {} }, { type: "textarea", modelValue: (__VLS_ctx.content), autosize: ({ minRows: 2, maxRows: 4 }), placeholder: "输入你的发言..." })));
const __VLS_2 = __VLS_1(Object.assign({ 'onKeyup': {} }, { type: "textarea", modelValue: (__VLS_ctx.content), autosize: ({ minRows: 2, maxRows: 4 }), placeholder: "输入你的发言..." }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onKeyup: (__VLS_ctx.onSend)
};
var __VLS_3;
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.sending), disabled: (!__VLS_ctx.content.trim()) })));
const __VLS_10 = __VLS_9(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.sending), disabled: (!__VLS_ctx.content.trim()) }), ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onClick: (__VLS_ctx.onSend)
};
__VLS_11.slots.default;
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['chat-input']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            content: content,
            sending: sending,
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
