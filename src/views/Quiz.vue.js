var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import request from '@/utils/request';
const router = useRouter();
const activeTab = ref('daily');
const ranking = ref([]);
const loadingRanking = ref(false);
// 拉取排行榜数据
function loadRanking() {
    return __awaiter(this, void 0, void 0, function* () {
        loadingRanking.value = true;
        try {
            const { data } = yield request.get('/quiz_result/ranking/today');
            ranking.value = data;
        }
        catch (e) {
            console.error('拉取排行榜失败', e);
        }
        finally {
            loadingRanking.value = false;
        }
    });
}
// 只保留每个用户名的第一条记录
const uniqueRanking = computed(() => {
    const seen = new Set();
    return ranking.value.filter(item => {
        if (seen.has(item.username))
            return false;
        seen.add(item.username);
        return true;
    });
});
// Tab 切换时加载对应数据
watch(activeTab, tab => {
    if (tab === 'ranking')
        loadRanking();
});
// 跳转到答题页面
function startQuiz() {
    router.push({ name: 'QuizPlay' });
}
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "daily-quiz-page" }));
const __VLS_3 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign({ class: "overview-card" }, { shadow: "hover" })));
const __VLS_5 = __VLS_4(Object.assign({ class: "overview-card" }, { shadow: "hover" }), ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "overview-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "overview-subtitle" }));
var __VLS_6;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "intro-text" }));
const __VLS_7 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7(Object.assign({ class: "quiz-tabs" }, { shadow: "never" })));
const __VLS_9 = __VLS_8(Object.assign({ class: "quiz-tabs" }, { shadow: "never" }), ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_10.slots.default;
const __VLS_11 = {}.ElTabs;
/** @type {[typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    modelValue: (__VLS_ctx.activeTab),
}));
const __VLS_13 = __VLS_12({
    modelValue: (__VLS_ctx.activeTab),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_14.slots.default;
const __VLS_15 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    label: "今日答题",
    name: "daily",
}));
const __VLS_17 = __VLS_16({
    label: "今日答题",
    name: "daily",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
const __VLS_19 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
    label: "排行榜",
    name: "ranking",
}));
const __VLS_21 = __VLS_20({
    label: "排行榜",
    name: "ranking",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
var __VLS_14;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "tab-content" }));
if (__VLS_ctx.activeTab === 'daily') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "daily-content" }));
    const __VLS_23 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23(Object.assign({ 'onClick': {} }, { type: "primary", size: "large" })));
    const __VLS_25 = __VLS_24(Object.assign({ 'onClick': {} }, { type: "primary", size: "large" }), ...__VLS_functionalComponentArgsRest(__VLS_24));
    let __VLS_27;
    let __VLS_28;
    let __VLS_29;
    const __VLS_30 = {
        onClick: (__VLS_ctx.startQuiz)
    };
    __VLS_26.slots.default;
    var __VLS_26;
}
if (__VLS_ctx.activeTab === 'ranking') {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "ranking-content" }));
    const __VLS_31 = {}.ElCard;
    /** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31(Object.assign({ class: "quiz-card" }, { shadow: "hover" })));
    const __VLS_33 = __VLS_32(Object.assign({ class: "quiz-card" }, { shadow: "hover" }), ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_34.slots.default;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "table-container" }));
    const __VLS_35 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35(Object.assign({ data: (__VLS_ctx.uniqueRanking), stripe: true, loading: (__VLS_ctx.loadingRanking) }, { style: {} })));
    const __VLS_37 = __VLS_36(Object.assign({ data: (__VLS_ctx.uniqueRanking), stripe: true, loading: (__VLS_ctx.loadingRanking) }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_36));
    __VLS_38.slots.default;
    {
        const { empty: __VLS_thisSlot } = __VLS_38.slots;
        const __VLS_39 = {}.ElEmpty;
        /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
        // @ts-ignore
        const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39({
            description: "暂无数据",
        }));
        const __VLS_41 = __VLS_40({
            description: "暂无数据",
        }, ...__VLS_functionalComponentArgsRest(__VLS_40));
    }
    const __VLS_43 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        prop: "username",
        label: "用户名",
    }));
    const __VLS_45 = __VLS_44({
        prop: "username",
        label: "用户名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    const __VLS_47 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        prop: "score",
        label: "正确数",
        width: "100",
    }));
    const __VLS_49 = __VLS_48({
        prop: "score",
        label: "正确数",
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    var __VLS_38;
    var __VLS_34;
}
var __VLS_10;
/** @type {__VLS_StyleScopedClasses['daily-quiz-page']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-card']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-title']} */ ;
/** @type {__VLS_StyleScopedClasses['overview-subtitle']} */ ;
/** @type {__VLS_StyleScopedClasses['intro-text']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-tabs']} */ ;
/** @type {__VLS_StyleScopedClasses['tab-content']} */ ;
/** @type {__VLS_StyleScopedClasses['daily-content']} */ ;
/** @type {__VLS_StyleScopedClasses['ranking-content']} */ ;
/** @type {__VLS_StyleScopedClasses['quiz-card']} */ ;
/** @type {__VLS_StyleScopedClasses['table-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            activeTab: activeTab,
            loadingRanking: loadingRanking,
            uniqueRanking: uniqueRanking,
            startQuiz: startQuiz,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
