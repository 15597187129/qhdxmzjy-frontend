var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, toRef, watch, onMounted } from 'vue';
import { ElNotification } from 'element-plus';
import request from '@/utils/request';
import ChatList from './ChatList.vue';
import ChatInput from './ChatInput.vue';
const props = defineProps();
const groupId = toRef(props, 'groupId');
const emit = defineEmits(['left']);
// 头部展示数据
const groupTitle = ref('');
const memberCount = ref(0);
// 加载组标题 & 人数
function loadHeader() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (groupId.value === null)
            return;
        try {
            const r = yield request.get('/discussions/my');
            const g = r.data.find((x) => x.id === groupId.value);
            groupTitle.value = (_a = g === null || g === void 0 ? void 0 : g.title) !== null && _a !== void 0 ? _a : '讨论组';
        }
        catch (_b) { }
        try {
            const r2 = yield request.get(`/discussions/${groupId.value}/members`);
            memberCount.value = r2.data.length;
        }
        catch (_c) { }
    });
}
// 监听 groupId 改变 & 初始加载
watch(groupId, loadHeader);
onMounted(loadHeader);
// 退出组
function leaveGroup() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (groupId.value === null)
            return;
        try {
            yield request.delete(`/discussions/${groupId.value}/leave`);
            ElNotification.info('已退出讨论组');
            emit('left');
        }
        catch (e) {
            ElNotification.error(((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '退出失败');
        }
    });
}
// 子组件 ChatInput 发完消息后回调，把它加到 ChatList
const chatList = ref(null);
function onSent(msg) {
    var _a;
    (_a = chatList.value) === null || _a === void 0 ? void 0 : _a.addMessage(msg);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['chat-header']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "chat-card" }, { bodyStyle: ({ padding: 0 }) })));
const __VLS_2 = __VLS_1(Object.assign({ class: "chat-card" }, { bodyStyle: ({ padding: 0 }) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
if (__VLS_ctx.groupTitle) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "chat-header" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "title" }));
    (__VLS_ctx.groupTitle);
    (__VLS_ctx.memberCount);
    const __VLS_5 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(Object.assign({ 'onClick': {} }, { size: "small", type: "danger" })));
    const __VLS_7 = __VLS_6(Object.assign({ 'onClick': {} }, { size: "small", type: "danger" }), ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_9;
    let __VLS_10;
    let __VLS_11;
    const __VLS_12 = {
        onClick: (__VLS_ctx.leaveGroup)
    };
    __VLS_8.slots.default;
    var __VLS_8;
}
if (__VLS_ctx.groupId !== null) {
    /** @type {[typeof ChatList, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(ChatList, new ChatList({
        groupId: (__VLS_ctx.groupId),
        ref: "chatList",
    }));
    const __VLS_14 = __VLS_13({
        groupId: (__VLS_ctx.groupId),
        ref: "chatList",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    /** @type {typeof __VLS_ctx.chatList} */ ;
    var __VLS_16 = {};
    var __VLS_15;
}
if (__VLS_ctx.groupId !== null) {
    /** @type {[typeof ChatInput, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(ChatInput, new ChatInput(Object.assign({ 'onSent': {} }, { groupId: (__VLS_ctx.groupId) })));
    const __VLS_19 = __VLS_18(Object.assign({ 'onSent': {} }, { groupId: (__VLS_ctx.groupId) }), ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_21;
    let __VLS_22;
    let __VLS_23;
    const __VLS_24 = {
        onSent: (__VLS_ctx.onSent)
    };
    var __VLS_20;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['chat-card']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-header']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
// @ts-ignore
var __VLS_17 = __VLS_16;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ChatList: ChatList,
            ChatInput: ChatInput,
            groupId: groupId,
            groupTitle: groupTitle,
            memberCount: memberCount,
            leaveGroup: leaveGroup,
            chatList: chatList,
            onSent: onSent,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
