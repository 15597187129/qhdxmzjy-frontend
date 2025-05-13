var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, reactive, onMounted } from 'vue';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
// 列表数据
const videos = ref([]);
// 弹窗和表单相关
const showDialog = ref(false);
const formRef = ref();
const form = reactive({
    title: '',
    description: '',
    video: null,
    cover: null
});
// 校验规则
const rules = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    description: [{ required: true, message: '请输入简介', trigger: 'blur' }],
    video: [{ required: true, message: '请选择视频文件', trigger: 'change' }]
};
// 重置表单
function resetForm() {
    var _a;
    form.title = '';
    form.description = '';
    form.video = null;
    form.cover = null;
    (_a = formRef.value) === null || _a === void 0 ? void 0 : _a.clearValidate();
}
// 文件选择
function onVideoChange(e) {
    var _a, _b;
    form.video = (_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
}
function onCoverChange(e) {
    var _a, _b;
    form.cover = (_b = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
}
// 提交上传
function submit() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        yield ((_a = formRef.value) === null || _a === void 0 ? void 0 : _a.validate());
        if (!form.video) {
            ElMessage.error('请先选择视频文件');
            return;
        }
        const fd = new FormData();
        fd.append('title', form.title);
        fd.append('description', form.description);
        fd.append('video', form.video);
        if (form.cover) {
            fd.append('cover', form.cover);
        }
        try {
            yield request.post('/video/add', fd, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            ElMessage.success('上传成功');
            showDialog.value = false;
            yield loadVideos();
        }
        catch (err) {
            console.error('上传失败', err);
            ElMessage.error(((_b = err.response) === null || _b === void 0 ? void 0 : _b.data) || '上传出错');
        }
    });
}
// 拉取列表
function loadVideos() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield request.get('/video/list');
            videos.value = data;
        }
        catch (e) {
            console.error('获取视频列表失败', e);
        }
    });
}
// 后端保存的是绝对路径，前端取文件名拼 URL
function getFileName(path) {
    return path.split('/').pop() || '';
}
onMounted(loadVideos);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['video-card']} */ ;
/** @type {__VLS_StyleScopedClasses['cover']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "teacher-videos-page" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "videos-header" }));
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onClick': {} }, { type: "primary" })));
const __VLS_2 = __VLS_1(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.showDialog = true;
    }
};
__VLS_3.slots.default;
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "video-grid" }));
for (const [video] of __VLS_getVForSourceType((__VLS_ctx.videos))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (video.id) }, { class: "video-card" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "cover" }));
    if (video.coverUrl) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (video.coverUrl.startsWith('http') ? video.coverUrl : `/videos/${__VLS_ctx.getFileName(video.coverUrl)}`),
            alt: "封面",
        });
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "cover-placeholder" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.i, __VLS_intrinsicElements.i)(Object.assign({ class: "mdi mdi-video-outline" }, { style: {} }));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "info" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(Object.assign({ class: "title" }));
    (video.title);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "desc" }));
    (video.description || '暂无描述');
}
const __VLS_8 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ 'onOpen': {} }, { modelValue: (__VLS_ctx.showDialog), title: "添加新视频", width: "520px" })));
const __VLS_10 = __VLS_9(Object.assign({ 'onOpen': {} }, { modelValue: (__VLS_ctx.showDialog), title: "添加新视频", width: "520px" }), ...__VLS_functionalComponentArgsRest(__VLS_9));
let __VLS_12;
let __VLS_13;
let __VLS_14;
const __VLS_15 = {
    onOpen: (__VLS_ctx.resetForm)
};
__VLS_11.slots.default;
const __VLS_16 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "100px",
}));
const __VLS_18 = __VLS_17({
    ref: "formRef",
    model: (__VLS_ctx.form),
    rules: (__VLS_ctx.rules),
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_20 = {};
__VLS_19.slots.default;
const __VLS_22 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    label: "标题",
    prop: "title",
}));
const __VLS_24 = __VLS_23({
    label: "标题",
    prop: "title",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
const __VLS_26 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "请输入视频标题",
}));
const __VLS_28 = __VLS_27({
    modelValue: (__VLS_ctx.form.title),
    placeholder: "请输入视频标题",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
var __VLS_25;
const __VLS_30 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
    label: "简介",
    prop: "description",
}));
const __VLS_32 = __VLS_31({
    label: "简介",
    prop: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_31));
__VLS_33.slots.default;
const __VLS_34 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
    type: "textarea",
    rows: "3",
    modelValue: (__VLS_ctx.form.description),
    placeholder: "请输入视频简介",
}));
const __VLS_36 = __VLS_35({
    type: "textarea",
    rows: "3",
    modelValue: (__VLS_ctx.form.description),
    placeholder: "请输入视频简介",
}, ...__VLS_functionalComponentArgsRest(__VLS_35));
var __VLS_33;
const __VLS_38 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
    label: "视频文件",
    prop: "video",
}));
const __VLS_40 = __VLS_39({
    label: "视频文件",
    prop: "video",
}, ...__VLS_functionalComponentArgsRest(__VLS_39));
__VLS_41.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ onChange: (__VLS_ctx.onVideoChange) }, { type: "file", accept: "video/*" }));
if (__VLS_ctx.form.video) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (__VLS_ctx.form.video.name);
}
var __VLS_41;
const __VLS_42 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
    label: "封面文件",
    prop: "cover",
}));
const __VLS_44 = __VLS_43({
    label: "封面文件",
    prop: "cover",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
__VLS_45.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)(Object.assign({ onChange: (__VLS_ctx.onCoverChange) }, { type: "file", accept: "image/*" }));
if (__VLS_ctx.form.cover) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (__VLS_ctx.form.cover.name);
}
var __VLS_45;
var __VLS_19;
{
    const { footer: __VLS_thisSlot } = __VLS_11.slots;
    const __VLS_46 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46(Object.assign({ 'onClick': {} })));
    const __VLS_48 = __VLS_47(Object.assign({ 'onClick': {} }), ...__VLS_functionalComponentArgsRest(__VLS_47));
    let __VLS_50;
    let __VLS_51;
    let __VLS_52;
    const __VLS_53 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showDialog = false;
        }
    };
    __VLS_49.slots.default;
    var __VLS_49;
    const __VLS_54 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54(Object.assign({ 'onClick': {} }, { type: "primary" })));
    const __VLS_56 = __VLS_55(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_55));
    let __VLS_58;
    let __VLS_59;
    let __VLS_60;
    const __VLS_61 = {
        onClick: (__VLS_ctx.submit)
    };
    __VLS_57.slots.default;
    var __VLS_57;
}
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['teacher-videos-page']} */ ;
/** @type {__VLS_StyleScopedClasses['videos-header']} */ ;
/** @type {__VLS_StyleScopedClasses['video-grid']} */ ;
/** @type {__VLS_StyleScopedClasses['video-card']} */ ;
/** @type {__VLS_StyleScopedClasses['cover']} */ ;
/** @type {__VLS_StyleScopedClasses['cover-placeholder']} */ ;
/** @type {__VLS_StyleScopedClasses['mdi']} */ ;
/** @type {__VLS_StyleScopedClasses['mdi-video-outline']} */ ;
/** @type {__VLS_StyleScopedClasses['info']} */ ;
/** @type {__VLS_StyleScopedClasses['title']} */ ;
/** @type {__VLS_StyleScopedClasses['desc']} */ ;
// @ts-ignore
var __VLS_21 = __VLS_20;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            videos: videos,
            showDialog: showDialog,
            formRef: formRef,
            form: form,
            rules: rules,
            resetForm: resetForm,
            onVideoChange: onVideoChange,
            onCoverChange: onCoverChange,
            submit: submit,
            getFileName: getFileName,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
