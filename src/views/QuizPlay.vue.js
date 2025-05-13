var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import request from '@/utils/request';
import { ElMessage } from 'element-plus';
import Navbar from '@/components/Navbar.vue';
// -------------------- state --------------------
const questions = ref([]);
const currentIndex = ref(0);
const selectedAnswer = ref(null);
const answers = ref([]);
// 倒计时初始 600 秒（10 分钟）
const remainingTime = ref(600);
let timerId = null;
const router = useRouter();
// -------------------- computed --------------------
const currentQuestion = computed(() => questions.value[currentIndex.value]);
const isLast = computed(() => currentIndex.value === questions.value.length - 1);
const options = computed(() => {
    const q = currentQuestion.value;
    if (!q)
        return [];
    return [
        { label: 'A', text: q.optionA || '' },
        { label: 'B', text: q.optionB || '' },
        { label: 'C', text: q.optionC || '' },
        { label: 'D', text: q.optionD || '' },
    ].filter(o => o.text);
});
// 新增：格式化分钟:秒
const formattedTime = computed(() => {
    const m = Math.floor(remainingTime.value / 60);
    const s = remainingTime.value % 60;
    const mm = String(m).padStart(2, '0');
    const ss = String(s).padStart(2, '0');
    return `${mm}:${ss}`;
});
// -------------------- methods --------------------
function loadQuestions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield request.get('/questions/daily');
            questions.value = data;
        }
        catch (err) {
            console.error('获取题目失败', err);
            ElMessage.error('获取题目失败');
        }
    });
}
function startTimer() {
    timerId = window.setInterval(() => {
        if (remainingTime.value > 0) {
            remainingTime.value--;
        }
        else {
            submitAnswers();
        }
    }, 1000);
}
function stopTimer() {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }
}
function saveCurrentAnswer() {
    const q = currentQuestion.value;
    if (!q)
        return;
    const exist = answers.value.find(a => a.questionId === q.id);
    const payload = {
        questionId: q.id,
        userAnswer: selectedAnswer.value || ''
    };
    if (exist) {
        exist.userAnswer = payload.userAnswer;
    }
    else {
        answers.value.push(payload);
    }
}
function restoreAnswer() {
    const q = currentQuestion.value;
    if (!q) {
        selectedAnswer.value = null;
        return;
    }
    const exist = answers.value.find(a => a.questionId === q.id);
    selectedAnswer.value = exist ? exist.userAnswer : null;
}
function prev() {
    saveCurrentAnswer();
    if (currentIndex.value > 0) {
        currentIndex.value--;
        restoreAnswer();
    }
}
function nextOrSubmit() {
    saveCurrentAnswer();
    if (isLast.value) {
        submitAnswers();
    }
    else {
        currentIndex.value++;
        restoreAnswer();
    }
}
function submitAnswers() {
    return __awaiter(this, void 0, void 0, function* () {
        stopTimer();
        try {
            const payload = { answers: answers.value };
            const { data } = yield request.post('/quiz_result/submit', payload);
            ElMessage.success(data);
            router.push({ name: 'daily-quiz' });
        }
        catch (err) {
            console.error('提交失败', err);
            ElMessage.error('提交失败');
        }
    });
}
onMounted(() => {
    loadQuestions();
    startTimer();
});
onBeforeUnmount(() => {
    stopTimer();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "quiz-container" }));
const __VLS_3 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign({ class: "quiz-card" }, { shadow: "hover" })));
const __VLS_5 = __VLS_4(Object.assign({ class: "quiz-card" }, { shadow: "hover" }), ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "quiz-header" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "quiz-title" }));
(__VLS_ctx.currentIndex + 1);
(__VLS_ctx.questions.length);
const __VLS_7 = {}.ElTag;
/** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7(Object.assign({ type: "danger", effect: "plain" }, { class: "quiz-timer" })));
const __VLS_9 = __VLS_8(Object.assign({ type: "danger", effect: "plain" }, { class: "quiz-timer" }), ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_10.slots.default;
(__VLS_ctx.formattedTime);
var __VLS_10;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "quiz-body" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "quiz-question" }));
(((_a = __VLS_ctx.currentQuestion) === null || _a === void 0 ? void 0 : _a.content) || '加载中...');
const __VLS_11 = {}.ElRadioGroup;
/** @type {[typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(Object.assign({ modelValue: (__VLS_ctx.selectedAnswer) }, { class: "quiz-option-group" })));
const __VLS_13 = __VLS_12(Object.assign({ modelValue: (__VLS_ctx.selectedAnswer) }, { class: "quiz-option-group" }), ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
for (const [opt] of __VLS_getVForSourceType((__VLS_ctx.options))) {
    const __VLS_15 = {}.ElRadio;
    /** @type {[typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, typeof __VLS_components.ElRadio, typeof __VLS_components.elRadio, ]} */ ;
    // @ts-ignore
    const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(Object.assign({ key: (opt.label), label: (opt.label) }, { class: "quiz-option" })));
    const __VLS_17 = __VLS_16(Object.assign({ key: (opt.label), label: (opt.label) }, { class: "quiz-option" }), ...__VLS_functionalComponentArgsRest(__VLS_16));
    __VLS_18.slots.default;
    (opt.label);
    (opt.text);
    var __VLS_18;
}
var __VLS_14;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "btn-group" }));
const __VLS_19 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19(Object.assign({ 'onClick': {} }, { disabled: (__VLS_ctx.currentIndex === 0) })));
const __VLS_21 = __VLS_20(Object.assign({ 'onClick': {} }, { disabled: (__VLS_ctx.currentIndex === 0) }), ...__VLS_functionalComponentArgsRest(__VLS_20));
let __VLS_23;
let __VLS_24;
let __VLS_25;
const __VLS_26 = {
    onClick: (__VLS_ctx.prev)
};
__VLS_22.slots.default;
var __VLS_22;
const __VLS_27 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27(Object.assign({ 'onClick': {} }, { type: "primary" })));
const __VLS_29 = __VLS_28(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_28));
let __VLS_31;
let __VLS_32;
let __VLS_33;
const __VLS_34 = {
    onClick: (__VLS_ctx.nextOrSubmit)
};
__VLS_30.slots.default;
(__VLS_ctx.isLast ? '提交答案' : '下一题');
var __VLS_30;
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['quiz-container']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-header']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-title']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-timer']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-body']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-question']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-option-group']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-option']} */ ;
/** @type {__VLS_StyleScopedClasses['btn-group']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            questions: questions,
            currentIndex: currentIndex,
            selectedAnswer: selectedAnswer,
            currentQuestion: currentQuestion,
            isLast: isLast,
            options: options,
            formattedTime: formattedTime,
            prev: prev,
            nextOrSubmit: nextOrSubmit,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
