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
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
// 从本地存储获取 Token
function getToken() {
    return localStorage.getItem('token');
}
const videos = ref([]);
function formatDate(dateString) {
    if (!dateString)
        return '无';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', { hour12: false });
}
function loadVideos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield request.get('/video/list', {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            if (Array.isArray(res.data)) {
                videos.value = res.data;
            }
            else {
                videos.value = [];
                console.warn('视频数据格式不正确:', res.data);
            }
        }
        catch (error) {
            ElMessage.error('加载视频列表失败');
            console.error('视频列表加载错误:', error);
        }
    });
}
function deleteVideo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield request.delete(`/video/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
            ElMessage.success('视频删除成功');
            loadVideos();
        }
        catch (error) {
            ElMessage.error('删除失败，请稍后重试');
            console.error('删除视频出错:', error);
        }
    });
}
onMounted(() => {
    loadVideos();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['el-table']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "teacher-videos" }));
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "box-card" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "box-card" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ slot: "header" }, { class: "clearfix" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_4 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    to: "/teacher/videos/upload",
}));
const __VLS_6 = __VLS_5({
    to: "/teacher/videos/upload",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ type: "primary" }, { style: {} })));
const __VLS_10 = __VLS_9(Object.assign({ type: "primary" }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
var __VLS_11;
var __VLS_7;
const __VLS_12 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12(Object.assign({ data: (__VLS_ctx.videos) }, { style: {} })));
const __VLS_14 = __VLS_13(Object.assign({ data: (__VLS_ctx.videos) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    prop: "title",
    label: "视频标题",
    align: "center",
}));
const __VLS_18 = __VLS_17({
    prop: "title",
    label: "视频标题",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "description",
    label: "简介",
    align: "center",
}));
const __VLS_22 = __VLS_21({
    prop: "description",
    label: "简介",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    prop: "createdAt",
    label: "上传时间",
    align: "center",
    width: "200",
}));
const __VLS_26 = __VLS_25({
    prop: "createdAt",
    label: "上传时间",
    align: "center",
    width: "200",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_27.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (__VLS_ctx.formatDate(scope.row.createdAt));
    __VLS_27.slots['' /* empty slot name completion */];
}
var __VLS_27;
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "操作",
    align: "center",
    width: "120",
}));
const __VLS_30 = __VLS_29({
    label: "操作",
    align: "center",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [scope] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(Object.assign({ 'onClick': {} }, { type: "danger", size: "small" })));
    const __VLS_34 = __VLS_33(Object.assign({ 'onClick': {} }, { type: "danger", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (...[$event]) => {
            __VLS_ctx.deleteVideo(scope.row.id);
        }
    };
    __VLS_35.slots.default;
    var __VLS_35;
    __VLS_31.slots['' /* empty slot name completion */];
}
var __VLS_31;
var __VLS_15;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['teacher-videos']} */ ;
/** @type {__VLS_StyleScopedClasses['box-card']} */ ;
/** @type {__VLS_StyleScopedClasses['clearfix']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            videos: videos,
            formatDate: formatDate,
            deleteVideo: deleteVideo,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
