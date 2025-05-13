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
const questions = ref([]);
function loadQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 拉取所有题目
            const { data } = yield request.get('/questions');
            // 只保留“最新”的 10 条 —— 根据 ID 倒序，再取前 10 条
            const latestTen = data
                .slice() // 复制一份，避免原数组被修改
                .sort((a, b) => b.id - a.id)
                .slice(0, 10);
            questions.value = latestTen;
        }
        catch (err) {
            console.error('获取题目失败', err);
        }
    });
}
onMounted(loadQuestions);
/**
 * 根据后端的 optionA..optionD 字段，组装成一个数组返回
 */
function formatOptions(row) {
    const opts = [
        { label: 'A', text: row.optionA },
        { label: 'B', text: row.optionB },
        { label: 'C', text: row.optionC },
        { label: 'D', text: row.optionD },
    ];
    // 过滤掉可能的空字符串
    return opts.filter(o => !!o.text);
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['questions-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "questions-card" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "questions-card" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
const __VLS_5 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(Object.assign({ data: (__VLS_ctx.questions), stripe: true }, { style: {} })));
const __VLS_7 = __VLS_6(Object.assign({ data: (__VLS_ctx.questions), stripe: true }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    prop: "id",
    label: "ID",
    width: "80",
}));
const __VLS_11 = __VLS_10({
    prop: "id",
    label: "ID",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
const __VLS_13 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    prop: "content",
    label: "题干",
}));
const __VLS_15 = __VLS_14({
    prop: "content",
    label: "题干",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const __VLS_17 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    label: "选项",
}));
const __VLS_19 = __VLS_18({
    label: "选项",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_20.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    for (const [opt] of __VLS_getVForSourceType((__VLS_ctx.formatOptions(row)))) {
        const __VLS_21 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(Object.assign({ key: (opt.label) }, { class: "option-tag" })));
        const __VLS_23 = __VLS_22(Object.assign({ key: (opt.label) }, { class: "option-tag" }), ...__VLS_functionalComponentArgsRest(__VLS_22));
        __VLS_24.slots.default;
        (opt.label);
        (opt.text);
        var __VLS_24;
    }
}
var __VLS_20;
const __VLS_25 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    prop: "correctAnswer",
    label: "正确答案",
    width: "120",
}));
const __VLS_27 = __VLS_26({
    prop: "correctAnswer",
    label: "正确答案",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['questions-card']} */ ;
/** @type {__VLS_StyleScopedClasses['option-tag']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            questions: questions,
            formatOptions: formatOptions,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
