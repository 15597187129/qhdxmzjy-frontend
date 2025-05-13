var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import request from '@/utils/request';
const router = useRouter();
const formRef = ref();
const loading = ref(false);
const form = ref({ name: '', description: '' });
const rules = {
    name: [
        { required: true, message: '讨论组名称不能为空', trigger: 'blur' },
        { min: 3, max: 50, message: '名称长度须在 3 到 50 字符之间', trigger: 'blur' }
    ],
    description: [
        { max: 200, message: '描述最多 200 字符', trigger: 'blur' }
    ]
};
const isValid = computed(() => {
    const n = form.value.name.trim().length;
    const d = form.value.description.trim().length;
    return n >= 3 && n <= 50 && d <= 200;
});
function onSubmit() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        (_a = formRef.value) === null || _a === void 0 ? void 0 : _a.validate((valid) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!valid)
                return;
            loading.value = true;
            try {
                // 调后端接口创建讨论组，并取回新组的ID
                const res = yield request.post('/discussions/create', {
                    title: form.value.name,
                    description: form.value.description
                });
                // 在成功提示中展示新组编号
                ElMessage.success(`创建成功，讨论组编号为：${res.data.id}`);
                // 跳回列表页
                router.push('/teacher/discussions');
            }
            catch (err) {
                console.error('创建失败', err);
                ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '创建失败，请重试');
            }
            finally {
                loading.value = false;
            }
        }));
    });
}
function onReset() {
    var _a;
    (_a = formRef.value) === null || _a === void 0 ? void 0 : _a.resetFields();
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "p-6 bg-gray-50 min-h-full" }));
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "max-w-xl mx-auto shadow-lg rounded-lg p-6 bg-white" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "max-w-xl mx-auto shadow-lg rounded-lg p-6 bg-white" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "text-2xl font-semibold text-blue-800 mb-6" }));
const __VLS_4 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4(Object.assign({ ref: "formRef", model: (__VLS_ctx.form), rules: (__VLS_ctx.rules), labelWidth: "90px" }, { class: "space-y-4" })));
const __VLS_6 = __VLS_5(Object.assign({ ref: "formRef", model: (__VLS_ctx.form), rules: (__VLS_ctx.rules), labelWidth: "90px" }, { class: "space-y-4" }), ...__VLS_functionalComponentArgsRest(__VLS_5));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_8 = {};
__VLS_7.slots.default;
const __VLS_10 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    label: "组名",
    prop: "name",
}));
const __VLS_12 = __VLS_11({
    label: "组名",
    prop: "name",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
__VLS_13.slots.default;
const __VLS_14 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "请输入讨论组名称",
    maxlength: "50",
    showWordLimit: true,
}));
const __VLS_16 = __VLS_15({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "请输入讨论组名称",
    maxlength: "50",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
var __VLS_13;
const __VLS_18 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    label: "描述",
    prop: "description",
}));
const __VLS_20 = __VLS_19({
    label: "描述",
    prop: "description",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (4),
    placeholder: "请输入组描述（选填）",
    maxlength: "200",
    showWordLimit: true,
}));
const __VLS_24 = __VLS_23({
    modelValue: (__VLS_ctx.form.description),
    type: "textarea",
    rows: (4),
    placeholder: "请输入组描述（选填）",
    maxlength: "200",
    showWordLimit: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
var __VLS_21;
const __VLS_26 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex justify-end space-x-4" }));
const __VLS_30 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30(Object.assign({ 'onClick': {} }, { disabled: (__VLS_ctx.loading) })));
const __VLS_32 = __VLS_31(Object.assign({ 'onClick': {} }, { disabled: (__VLS_ctx.loading) }), ...__VLS_functionalComponentArgsRest(__VLS_31));
let __VLS_34;
let __VLS_35;
let __VLS_36;
const __VLS_37 = {
    onClick: (__VLS_ctx.onReset)
};
__VLS_33.slots.default;
var __VLS_33;
const __VLS_38 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loading), disabled: (!__VLS_ctx.isValid) })));
const __VLS_40 = __VLS_39(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.loading), disabled: (!__VLS_ctx.isValid) }), ...__VLS_functionalComponentArgsRest(__VLS_39));
let __VLS_42;
let __VLS_43;
let __VLS_44;
const __VLS_45 = {
    onClick: (__VLS_ctx.onSubmit)
};
__VLS_41.slots.default;
var __VLS_41;
var __VLS_29;
var __VLS_7;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['shadow-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-blue-800']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-4']} */ ;
// @ts-ignore
var __VLS_9 = __VLS_8;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formRef: formRef,
            loading: loading,
            form: form,
            rules: rules,
            isValid: isValid,
            onSubmit: onSubmit,
            onReset: onReset,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
