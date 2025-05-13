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
import request from '@/utils/request';
import PostItem from './PostItem.vue';
import PostForm from './PostForm.vue';
const posts = ref([]); // 当前讨论组的帖子
const discussion = ref({}); // 当前讨论组信息
const currentPage = ref(1);
const totalPosts = ref(0);
// 获取讨论组信息和帖子
const fetchDiscussionDetails = (discussionId) => __awaiter(void 0, void 0, void 0, function* () {
    const discussionResponse = yield request.get(`/discussions/${discussionId}`);
    discussion.value = discussionResponse.data;
    fetchPosts(discussionId, currentPage.value);
});
const fetchPosts = (discussionId, page) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield request.get(`/posts/${discussionId}?page=${page}&size=10`);
    posts.value = response.data.content;
    totalPosts.value = response.data.totalElements;
});
// 分页切换
const handlePageChange = (page) => {
    fetchPosts(discussion.value.id, page);
};
// 页面加载时获取讨论组信息
onMounted(() => {
    const discussionId = 1; // 替换为实际的讨论组ID
    fetchDiscussionDetails(discussionId);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "discussion-detail" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
(__VLS_ctx.discussion.title);
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
(__VLS_ctx.discussion.description);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "post-list" }));
for (const [post] of __VLS_getVForSourceType((__VLS_ctx.posts))) {
    /** @type {[typeof PostItem, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PostItem, new PostItem({
        key: (post.id),
        post: (post),
    }));
    const __VLS_1 = __VLS_0({
        key: (post.id),
        post: (post),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {[typeof PostForm, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(PostForm, new PostForm(Object.assign({ 'onPostCreated': {} })));
const __VLS_4 = __VLS_3(Object.assign({ 'onPostCreated': {} }), ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onPostCreated: (__VLS_ctx.fetchPosts)
};
var __VLS_5;
const __VLS_10 = {}.ElPagination;
/** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10(Object.assign({ 'onCurrentChange': {} }, { currentPage: (__VLS_ctx.currentPage), pageSize: (10), total: (__VLS_ctx.totalPosts) })));
const __VLS_12 = __VLS_11(Object.assign({ 'onCurrentChange': {} }, { currentPage: (__VLS_ctx.currentPage), pageSize: (10), total: (__VLS_ctx.totalPosts) }), ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
let __VLS_16;
const __VLS_17 = {
    onCurrentChange: (__VLS_ctx.handlePageChange)
};
var __VLS_13;
/** @type {__VLS_StyleScopedClasses['discussion-detail']} */ ;
/** @type {__VLS_StyleScopedClasses['post-list']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            PostItem: PostItem,
            PostForm: PostForm,
            posts: posts,
            discussion: discussion,
            currentPage: currentPage,
            totalPosts: totalPosts,
            fetchPosts: fetchPosts,
            handlePageChange: handlePageChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
