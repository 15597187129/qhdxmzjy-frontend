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
const ranking = ref([]);
function loadRanking() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // 这里的 /quiz_result/ranking/today 会被代理到 http://你的后端:8888/api/quiz_result/ranking/today
            const { data } = yield request.get('/quiz_result/ranking/today');
            ranking.value = data;
        }
        catch (err) {
            console.error('获取排行榜失败', err);
        }
    });
}
onMounted(loadRanking);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "ranking-card" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "ranking-card" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({});
const __VLS_5 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(Object.assign(Object.assign({ data: (__VLS_ctx.ranking), stripe: true }, { style: {} }), { emptyText: "暂无数据" })));
const __VLS_7 = __VLS_6(Object.assign(Object.assign({ data: (__VLS_ctx.ranking), stripe: true }, { style: {} }), { emptyText: "暂无数据" }), ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    label: "名次",
    width: "80",
}));
const __VLS_11 = __VLS_10({
    label: "名次",
    width: "80",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_12.slots;
    const [{ $index }] = __VLS_getSlotParams(__VLS_thisSlot);
    ($index + 1);
}
var __VLS_12;
const __VLS_13 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    prop: "username",
    label: "用户名",
}));
const __VLS_15 = __VLS_14({
    prop: "username",
    label: "用户名",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const __VLS_17 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    prop: "score",
    label: "分数",
    width: "100",
}));
const __VLS_19 = __VLS_18({
    prop: "score",
    label: "分数",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['ranking-card']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ranking: ranking,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
