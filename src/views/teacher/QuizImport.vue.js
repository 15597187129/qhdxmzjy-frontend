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
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
/** Element Plus 的文件列表 */
const fileList = ref([]);
/** 当前选中的原始 File 对象 */
const selectedFile = ref(null);
/** 导入中状态 */
const loading = ref(false);
/** 用户选中或拖入文件时触发 */
function handleChange(file, fl) {
    // 只保留最后一个
    fileList.value = fl.slice(-1);
    // 从 UploadFile.raw 中拿出原生 File
    selectedFile.value = file.raw instanceof File ? file.raw : null;
}
/** 用户移除文件时触发 */
function handleRemove() {
    fileList.value = [];
    selectedFile.value = null;
}
/** 点击“开始导入” */
function startImport() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!selectedFile.value)
            return;
        loading.value = true;
        const formData = new FormData();
        formData.append('file', selectedFile.value);
        try {
            // 注意：后端接口是 /api/questions/import
            const res = yield request.post('/questions/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            ElMessage.success(res.data.message || '导入成功');
            // 清空
            handleRemove();
        }
        catch (err) {
            console.error(err);
            const msg = ((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '导入失败';
            ElMessage.error(msg);
        }
        finally {
            loading.value = false;
        }
    });
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "quiz-import-page" }));
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "import-card" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "import-card" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "card-title" }));
const __VLS_4 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign(Object.assign(Object.assign({ 'onChange': {} }, { 'onRemove': {} }), { class: "upload-area" }), { drag: true, accept: ".xlsx,.xls", autoUpload: (false), listType: "text", fileList: (__VLS_ctx.fileList) })));
const __VLS_6 = __VLS_5(Object.assign(Object.assign(Object.assign({ 'onChange': {} }, { 'onRemove': {} }), { class: "upload-area" }), { drag: true, accept: ".xlsx,.xls", autoUpload: (false), listType: "text", fileList: (__VLS_ctx.fileList) }), ...__VLS_functionalComponentArgsRest(__VLS_5));
let __VLS_8;
let __VLS_9;
let __VLS_10;
const __VLS_11 = {
    onChange: (__VLS_ctx.handleChange)
};
const __VLS_12 = {
    onRemove: (__VLS_ctx.handleRemove)
};
__VLS_7.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(Object.assign({ class: "el-icon-upload" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "el-upload__text" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.em, __VLS_intrinsicElements.em)({});
var __VLS_7;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "import-action" }));
const __VLS_13 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loading), disabled: (!__VLS_ctx.selectedFile || __VLS_ctx.loading) })));
const __VLS_15 = __VLS_14(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loading), disabled: (!__VLS_ctx.selectedFile || __VLS_ctx.loading) }), ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_17;
let __VLS_18;
let __VLS_19;
const __VLS_20 = {
    onClick: (__VLS_ctx.startImport)
};
__VLS_16.slots.default;
var __VLS_16;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['quiz-import-page']} */ ;
/** @type {__VLS_StyleScopedClasses['import-card']} */ ;
/** @type {__VLS_StyleScopedClasses['card-title']} */ ;
/** @type {__VLS_StyleScopedClasses['upload-area']} */ ;
/** @type {__VLS_StyleScopedClasses['el-icon-upload']} */ ;
/** @type {__VLS_StyleScopedClasses['el-upload__text']} */ ;
/** @type {__VLS_StyleScopedClasses['import-action']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            fileList: fileList,
            selectedFile: selectedFile,
            loading: loading,
            handleChange: handleChange,
            handleRemove: handleRemove,
            startImport: startImport,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
