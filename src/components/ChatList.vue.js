var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, watch, nextTick, onMounted, defineExpose } from 'vue';
import MessageItem from './MessageItem.vue';
import request from '@/utils/request';
const props = defineProps();
// 解析当前用户 ID
function parseJwt(t) {
    try {
        const p = t.split('.')[1];
        return JSON.parse(decodeURIComponent(atob(p)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')));
    }
    catch (_a) {
        return {};
    }
}
const myUserId = parseJwt(localStorage.getItem('token') || '').id || 0;
// 数据状态
const messages = ref([]);
const page = ref(0);
const total = ref(1);
const loading = ref(false);
const scrollContainer = ref(null);
// 暴露给外部：追加一条消息并滚到底部
function addMessage(msg) {
    messages.value.push(msg);
    nextTick(() => {
        if (scrollContainer.value)
            scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
    });
}
const __VLS_exposed = { addMessage };
defineExpose(__VLS_exposed);
// 分页拉取消息
function loadMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        if (props.groupId <= 0 || page.value >= total.value)
            return;
        loading.value = true;
        try {
            const res = yield request.get(`/posts/${props.groupId}`, { params: { page: page.value, size: 20 } });
            if (page.value === 0)
                messages.value = [];
            messages.value.push(...res.data.content);
            total.value = res.data.totalPages;
            yield nextTick();
            if (scrollContainer.value)
                scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight;
        }
        finally {
            loading.value = false;
        }
    });
}
// 切换 groupId 时重置并加载
watch(() => props.groupId, () => {
    page.value = 0;
    total.value = 1;
    messages.value = [];
    loadMessages();
});
onMounted(() => {
    var _a;
    loadMessages();
    (_a = scrollContainer.value) === null || _a === void 0 ? void 0 : _a.addEventListener('scroll', () => {
        if (scrollContainer.value.scrollTop === 0 &&
            !loading.value &&
            page.value < total.value - 1) {
            page.value++;
            loadMessages();
        }
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "chat-list" }, { ref: "scrollContainer" }));
/** @type {typeof __VLS_ctx.scrollContainer} */ ;
for (const [msg] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
    /** @type {[typeof MessageItem, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(MessageItem, new MessageItem({
        key: (msg.id),
        msg: (msg),
        isMine: (msg.userId === __VLS_ctx.myUserId),
    }));
    const __VLS_1 = __VLS_0({
        key: (msg.id),
        msg: (msg),
        isMine: (msg.userId === __VLS_ctx.myUserId),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
if (!__VLS_ctx.messages.length && !__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "empty" }));
}
if (__VLS_ctx.loading && __VLS_ctx.page > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "load-more" }));
}
/** @type {__VLS_StyleScopedClasses['chat-list']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
/** @type {__VLS_StyleScopedClasses['load-more']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            MessageItem: MessageItem,
            myUserId: myUserId,
            messages: messages,
            page: page,
            loading: loading,
            scrollContainer: scrollContainer,
        };
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return Object.assign({}, __VLS_exposed);
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
