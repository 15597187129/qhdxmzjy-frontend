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
const form = ref({
    title: '',
    description: '',
    file: null,
});
const fileList = ref([]);
const uploading = ref(false);
function handleChange(file) {
    // 直接使用 file，去掉 raw
    form.value.file = file;
    fileList.value = [file];
}
function handleRemove() {
    form.value.file = null;
    fileList.value = [];
}
function removeFile() {
    form.value.file = null;
    fileList.value = [];
}
function beforeUpload(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        ElMessage.error('仅支持 jpg、jpeg、png、webp 格式图片');
        return false;
    }
    if (file.size > 10 * 1024 * 1024) {
        ElMessage.error('图片大小不能超过 10MB');
        return false;
    }
    return true;
}
function upload() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!form.value.file) {
            ElMessage.error('请先选择图片');
            return;
        }
        const formData = new FormData();
        formData.append('title', form.value.title);
        formData.append('description', form.value.description);
        formData.append('file', form.value.file);
        uploading.value = true;
        try {
            yield request.post('/panorama/upload', formData);
            ElMessage.success('上传成功');
            form.value.file = null;
            fileList.value = [];
        }
        catch (err) {
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '上传失败');
        }
        finally {
            uploading.value = false;
        }
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "upload-panorama" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "title" }));
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ model: (__VLS_ctx.form), ref: "formRef", labelWidth: "80px" }, { class: "upload-form" })));
const __VLS_2 = __VLS_1(Object.assign({ model: (__VLS_ctx.form), ref: "formRef", labelWidth: "80px" }, { class: "upload-form" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    label: "标题",
    prop: "title",
}));
const __VLS_8 = __VLS_7({
    label: "标题",
    prop: "title",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "请输入全景图片标题",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "请输入全景图片标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_9;
const __VLS_14 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "描述",
    prop: "description",
}));
const __VLS_16 = __VLS_15({
    label: "描述",
    prop: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    modelValue: (__VLS_ctx.form.description),
    placeholder: "请输入描述",
}));
const __VLS_20 = __VLS_19({
    modelValue: (__VLS_ctx.form.description),
    placeholder: "请输入描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
var __VLS_17;
const __VLS_22 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    label: "选择图片",
    prop: "file",
}));
const __VLS_24 = __VLS_23({
    label: "选择图片",
    prop: "file",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26(Object.assign(Object.assign(Object.assign(Object.assign({ 'onChange': {} }, { 'onRemove': {} }), { ref: "uploadRef" }), { class: "upload-demo" }), { fileList: (__VLS_ctx.fileList), limit: (1), autoUpload: (false), accept: "image/jpeg, image/png, image/webp", listType: "text", beforeUpload: (__VLS_ctx.beforeUpload) })));
const __VLS_28 = __VLS_27(Object.assign(Object.assign(Object.assign(Object.assign({ 'onChange': {} }, { 'onRemove': {} }), { ref: "uploadRef" }), { class: "upload-demo" }), { fileList: (__VLS_ctx.fileList), limit: (1), autoUpload: (false), accept: "image/jpeg, image/png, image/webp", listType: "text", beforeUpload: (__VLS_ctx.beforeUpload) }), ...__VLS_functionalComponentArgsRest(__VLS_27));
let __VLS_30;
let __VLS_31;
let __VLS_32;
const __VLS_33 = {
    onChange: (__VLS_ctx.handleChange)
};
const __VLS_34 = {
    onRemove: (__VLS_ctx.handleRemove)
};
/** @type {typeof __VLS_ctx.uploadRef} */ ;
var __VLS_35 = {};
__VLS_29.slots.default;
if (!__VLS_ctx.fileList.length) {
    const __VLS_37 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        type: "primary",
    }));
    const __VLS_39 = __VLS_38({
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_40.slots.default;
    var __VLS_40;
}
var __VLS_29;
if (__VLS_ctx.fileList.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "file-preview" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "file-name" }));
    (__VLS_ctx.fileList[0].name);
    const __VLS_41 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41(Object.assign(Object.assign({ 'onClick': {} }, { type: "danger", icon: "el-icon-close", size: "small" }), { class: "remove-btn" })));
    const __VLS_43 = __VLS_42(Object.assign(Object.assign({ 'onClick': {} }, { type: "danger", icon: "el-icon-close", size: "small" }), { class: "remove-btn" }), ...__VLS_functionalComponentArgsRest(__VLS_42));
    let __VLS_45;
    let __VLS_46;
    let __VLS_47;
    const __VLS_48 = {
        onClick: (__VLS_ctx.removeFile)
    };
    var __VLS_44;
}
var __VLS_25;
const __VLS_49 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
__VLS_52.slots.default;
const __VLS_53 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53(Object.assign({ 'onClick': {} }, { type: "primary", disabled: (!__VLS_ctx.form.file), loading: (__VLS_ctx.uploading) })));
const __VLS_55 = __VLS_54(Object.assign({ 'onClick': {} }, { type: "primary", disabled: (!__VLS_ctx.form.file), loading: (__VLS_ctx.uploading) }), ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
let __VLS_59;
const __VLS_60 = {
    onClick: (__VLS_ctx.upload)
};
__VLS_56.slots.default;
var __VLS_56;
var __VLS_52;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['upload-panorama']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-form']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-demo']} */ ;
/** @type {__VLS_StyleScopedClasses['file-preview']} */ ;
/** @type {__VLS_StyleScopedClasses['file-name']} */ ;
/** @type {__VLS_StyleScopedClasses['remove-btn']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4, __VLS_36 = __VLS_35;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            form: form,
            fileList: fileList,
            uploading: uploading,
            handleChange: handleChange,
            handleRemove: handleRemove,
            removeFile: removeFile,
            beforeUpload: beforeUpload,
            upload: upload,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
