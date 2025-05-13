var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, watch } from 'vue';
import { ElCard, ElInput, ElButton, ElAvatar } from 'element-plus';
import axios from 'axios';
const selectedDiscussionId = ref(null);
const posts = ref([]);
const newMessage = ref('');
// 获取讨论组的消息
const fetchPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    if (selectedDiscussionId.value) {
        try {
            const response = yield axios.get(`/discussions/${selectedDiscussionId.value}/posts`);
            posts.value = response.data.map((post) => ({
                id: post.id,
                userAvatar: post.userAvatar,
                username: post.username,
                content: post.content,
                time: post.time
            }));
        }
        catch (error) {
            console.error('获取消息失败:', error);
        }
    }
});
// 发送消息
const sendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    if (newMessage.value.trim()) {
        try {
            yield axios.post('/discussions/post', { discussionId: selectedDiscussionId.value, content: newMessage.value });
            newMessage.value = ''; // 清空输入框
            fetchPosts(); // 刷新消息
        }
        catch (error) {
            console.error('发送消息失败:', error);
        }
    }
});
// 自动滚动到底部
watch(posts, () => {
    const messageList = document.querySelector('.message-list');
    if (messageList) {
        messageList.scrollTop = messageList.scrollHeight;
    }
});
// 页面加载时获取消息
fetchPosts();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "discussion-content" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "message-list" }, { ref: "messageList" }));
/** @type {typeof __VLS_ctx.messageList} */ ;
for (const [post] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (post.id) }, { class: "message-card" }));
    const __VLS_0 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        bodyStyle: ({ padding: '10px' }),
    }));
    const __VLS_2 = __VLS_1({
        bodyStyle: ({ padding: '10px' }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_3.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "message-header" }));
    const __VLS_4 = {}.ElAvatar;
    /** @type {[typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, typeof __VLS_components.ElAvatar, typeof __VLS_components.elAvatar, ]} */ ;
    // @ts-ignore
    const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
        src: (post.userAvatar),
        size: "small",
    }));
    const __VLS_6 = __VLS_5({
        src: (post.userAvatar),
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_5));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (post.username);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (post.time);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    (post.content);
    var __VLS_3;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "message-input-container" }));
const __VLS_8 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ modelValue: (__VLS_ctx.newMessage), placeholder: "输入消息..." }, { class: "message-input" })));
const __VLS_10 = __VLS_9(Object.assign({ modelValue: (__VLS_ctx.newMessage), placeholder: "输入消息..." }, { class: "message-input" }), ...__VLS_functionalComponentArgsRest(__VLS_9));
const __VLS_12 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(Object.assign({ 'onClick': {} }, { class: "send-button" })));
const __VLS_14 = __VLS_13(Object.assign({ 'onClick': {} }, { class: "send-button" }), ...__VLS_functionalComponentArgsRest(__VLS_13));
let __VLS_16;
let __VLS_17;
let __VLS_18;
const __VLS_19 = {
    onClick: (__VLS_ctx.sendMessage)
};
__VLS_15.slots.default;
var __VLS_15;
/** @type {__VLS_StyleScopedClasses['discussion-content']} */ ;
/** @type {__VLS_StyleScopedClasses['message-list']} */ ;
/** @type {__VLS_StyleScopedClasses['message-card']} */ ;
/** @type {__VLS_StyleScopedClasses['message-header']} */ ;
/** @type {__VLS_StyleScopedClasses['message-input-container']} */ ;
/** @type {__VLS_StyleScopedClasses['message-input']} */ ;
/** @type {__VLS_StyleScopedClasses['send-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ElCard: ElCard,
            ElInput: ElInput,
            ElButton: ElButton,
            ElAvatar: ElAvatar,
            posts: posts,
            newMessage: newMessage,
            sendMessage: sendMessage,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
