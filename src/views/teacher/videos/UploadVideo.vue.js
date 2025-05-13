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
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
const title = ref('');
const description = ref('');
const coverFile = ref(null);
const videoFile = ref(null);
function handleCoverChange(event) {
    const target = event.target;
    if (target.files) {
        coverFile.value = target.files[0];
    }
}
function handleVideoChange(event) {
    const target = event.target;
    if (target.files) {
        videoFile.value = target.files[0];
    }
}
function handleUpload() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!title.value || !description.value || !coverFile.value || !videoFile.value) {
            ElMessage.error('请填写完整信息');
            return;
        }
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('description', description.value);
        formData.append('coverFile', coverFile.value);
        formData.append('videoFile', videoFile.value);
        try {
            const response = yield request.post('/video/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            ElMessage.success('视频上传成功');
            console.log('上传成功:', response.data);
            resetForm();
        }
        catch (error) {
            ElMessage.error('视频上传失败');
            console.error('上传失败:', error);
        }
    });
}
function resetForm() {
    title.value = '';
    description.value = '';
    coverFile.value = null;
    videoFile.value = null;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "upload-video" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "uploadForm",
    labelWidth: "80px",
}));
const __VLS_2 = __VLS_1({
    ref: "uploadForm",
    labelWidth: "80px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.uploadForm} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    label: "视频标题",
}));
const __VLS_8 = __VLS_7({
    label: "视频标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.title),
    placeholder: "输入视频标题",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.title),
    placeholder: "输入视频标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_9;
const __VLS_14 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "简介",
}));
const __VLS_16 = __VLS_15({
    label: "简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    modelValue: (__VLS_ctx.description),
    placeholder: "输入视频简介",
}));
const __VLS_20 = __VLS_19({
    modelValue: (__VLS_ctx.description),
    placeholder: "输入视频简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
var __VLS_17;
const __VLS_22 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    label: "封面上传",
}));
const __VLS_24 = __VLS_23({
    label: "封面上传",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ onChange: (__VLS_ctx.handleCoverChange) }, { type: "file" }));
var __VLS_25;
const __VLS_26 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    label: "视频上传",
}));
const __VLS_28 = __VLS_27({
    label: "视频上传",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ onChange: (__VLS_ctx.handleVideoChange) }, { type: "file" }));
var __VLS_29;
const __VLS_30 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
const __VLS_34 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34(Object.assign({ 'onClick': {} }, { type: "primary" })));
const __VLS_36 = __VLS_35(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_35));
let __VLS_38;
let __VLS_39;
let __VLS_40;
const __VLS_41 = {
    onClick: (__VLS_ctx.handleUpload)
};
__VLS_37.slots.default;
var __VLS_37;
var __VLS_33;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['upload-video']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            title: title,
            description: description,
            handleCoverChange: handleCoverChange,
            handleVideoChange: handleVideoChange,
            handleUpload: handleUpload,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
