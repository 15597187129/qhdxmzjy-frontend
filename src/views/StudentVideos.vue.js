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
import Navbar from '@/components/Navbar.vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
// 数据与状态
const videos = ref([]);
const loading = ref(true);
const isPlayerVisible = ref(false);
const currentVideoUrl = ref('');
// 骨架屏模板
const skeletonTemplate = `
  <div class="skeleton-card" v-for="i in 8">
    <el-skeleton-item variant="image" style="width:100%;height:160px;border-radius:8px" />
    <div style="padding:12px">
      <el-skeleton-item variant="text" style="width:60%;margin-bottom:8px" />
      <el-skeleton-item variant="text" style="width:40%" />
    </div>
  </div>
`;
// 格式化日期
function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}
// 封面地址
function getCoverUrl(url) {
    return url || '/default-cover.jpg';
}
// 打开播放
function playVideo(video) {
    currentVideoUrl.value = video.videoUrl;
    isPlayerVisible.value = true;
}
// 关闭播放
function closePlayer() {
    isPlayerVisible.value = false;
    currentVideoUrl.value = '';
}
// 拉列表
function loadVideos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield request.get('/video/list');
            if (Array.isArray(res.data)) {
                videos.value = res.data;
            }
            else {
                ElMessage.warning('视频列表数据格式异常');
            }
        }
        catch (err) {
            ElMessage.error('加载视频列表失败');
        }
        finally {
            loading.value = false;
        }
    });
}
onMounted(loadVideos);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['video-card']} */ ;
/** @type {__VLS_StyleScopedClasses['video-info']} */ ;
/** @type {__VLS_StyleScopedClasses['video-info']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "student-videos" }));
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "videos-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "motto" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
if (__VLS_ctx.loading) {
    const __VLS_3 = {}.ElSkeleton;
    /** @type {[typeof __VLS_components.ElSkeleton, typeof __VLS_components.elSkeleton, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign(Object.assign({ animated: true }, { class: "skeleton-grid" }), { rows: (4), template: (__VLS_ctx.skeletonTemplate) })));
    const __VLS_5 = __VLS_4(Object.assign(Object.assign({ animated: true }, { class: "skeleton-grid" }), { rows: (4), template: (__VLS_ctx.skeletonTemplate) }), ...__VLS_functionalComponentArgsRest(__VLS_4));
}
else if (__VLS_ctx.videos.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "video-grid" }));
    for (const [video] of __VLS_getVForSourceType((__VLS_ctx.videos))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign(Object.assign({ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.loading))
                    return;
                if (!(__VLS_ctx.videos.length))
                    return;
                __VLS_ctx.playVideo(video);
            } }, { key: (video.id) }), { class: "video-card" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "cover-wrapper" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ src: (__VLS_ctx.getCoverUrl(video.coverUrl)), alt: "视频封面", loading: "lazy" }, { class: "video-cover" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "video-info" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(Object.assign({ class: "title" }));
        (video.title);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "date" }));
        (__VLS_ctx.formatDate(video.createdAt));
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "empty-message" }));
    const __VLS_7 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        description: "暂无视频，请稍后再试",
    }));
    const __VLS_9 = __VLS_8({
        description: "暂无视频，请稍后再试",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
}
const __VLS_11 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(Object.assign({ 'onClose': {} }, { modelValue: (__VLS_ctx.isPlayerVisible), width: "90%", modalAppendToBody: (true), customClass: "video-dialog", destroyOnClose: (true) })));
const __VLS_13 = __VLS_12(Object.assign({ 'onClose': {} }, { modelValue: (__VLS_ctx.isPlayerVisible), width: "90%", modalAppendToBody: (true), customClass: "video-dialog", destroyOnClose: (true) }), ...__VLS_functionalComponentArgsRest(__VLS_12));
let __VLS_15;
let __VLS_16;
let __VLS_17;
const __VLS_18 = {
    onClose: (__VLS_ctx.closePlayer)
};
__VLS_14.slots.default;
{
    const { title: __VLS_thisSlot } = __VLS_14.slots;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "player-container" }));
if (__VLS_ctx.currentVideoUrl) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.video)(Object.assign({ src: (__VLS_ctx.currentVideoUrl), controls: true, autoplay: true }, { class: "video-player" }));
}
var __VLS_14;
/** @type {__VLS_StyleScopedClasses['student-videos']} */ ;
/** @type {__VLS_StyleScopedClasses['videos-header']} */ ;
/** @type {__VLS_StyleScopedClasses['motto']} */ ;
/** @type {__VLS_StyleScopedClasses['skeleton-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['video-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['video-card']} */ ;
/** @type {__VLS_StyleScopedClasses['cover-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['video-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['video-info']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['date']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-message']} */ ;
/** @type {__VLS_StyleScopedClasses['player-container']} */ ;
/** @type {__VLS_StyleScopedClasses['video-player']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            videos: videos,
            loading: loading,
            isPlayerVisible: isPlayerVisible,
            currentVideoUrl: currentVideoUrl,
            skeletonTemplate: skeletonTemplate,
            formatDate: formatDate,
            getCoverUrl: getCoverUrl,
            playVideo: playVideo,
            closePlayer: closePlayer,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
