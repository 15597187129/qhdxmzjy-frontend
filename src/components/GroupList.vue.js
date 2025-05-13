var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, computed, onMounted, watch } from 'vue';
import { ElNotification } from 'element-plus';
import request from '@/utils/request';
const props = defineProps();
const emit = defineEmits(['update:selected', 'joined']);
const groups = ref([]);
const filter = ref('');
const joinId = ref('');
const joining = ref(false);
const joinActive = ref(['1']);
// 加载列表
function loadGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const res = yield request.get('/discussions/my');
            groups.value = res.data;
        }
        catch (e) {
            ElNotification.error(((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加载讨论组失败');
        }
    });
}
// 搜索过滤
const filteredGroups = computed(() => {
    if (!filter.value.trim())
        return groups.value;
    const key = filter.value.toLowerCase();
    return groups.value.filter(g => g.title.toLowerCase().includes(key));
});
// 加入
function onJoin() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!joinId.value.trim())
            return;
        joining.value = true;
        try {
            yield request.post('/discussions/join', { discussionId: +joinId.value });
            ElNotification.success('加入成功');
            yield loadGroups();
            emit('joined', +joinId.value);
            joinId.value = '';
        }
        catch (e) {
            ElNotification.error(((_b = (_a = e.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加入失败');
        }
        finally {
            joining.value = false;
        }
    });
}
// 选中
function select(id) {
    emit('update:selected', +id);
}
onMounted(loadGroups);
watch(() => props.selected, loadGroups);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['group-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['group-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['el-menu-item']} */ ;
/** @type {__VLS_StyleScopedClasses['group-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['el-menu-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ class: "group-list-card" })));
const __VLS_2 = __VLS_1(Object.assign({ class: "group-list-card" }), ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "panel-title" }));
const __VLS_5 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5(Object.assign({ modelValue: (__VLS_ctx.filter), placeholder: "搜索讨论组", clearable: true, size: "small" }, { class: "search-input" })));
const __VLS_7 = __VLS_6(Object.assign({ modelValue: (__VLS_ctx.filter), placeholder: "搜索讨论组", clearable: true, size: "small" }, { class: "search-input" }), ...__VLS_functionalComponentArgsRest(__VLS_6));
const __VLS_9 = {}.ElCollapse;
/** @type {[typeof __VLS_components.ElCollapse, typeof __VLS_components.elCollapse, typeof __VLS_components.ElCollapse, typeof __VLS_components.elCollapse, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9(Object.assign({ modelValue: (__VLS_ctx.joinActive) }, { class: "join-collapse" })));
const __VLS_11 = __VLS_10(Object.assign({ modelValue: (__VLS_ctx.joinActive) }, { class: "join-collapse" }), ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.ElCollapseItem;
/** @type {[typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, typeof __VLS_components.ElCollapseItem, typeof __VLS_components.elCollapseItem, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    name: "1",
    title: "加入讨论组",
}));
const __VLS_15 = __VLS_14({
    name: "1",
    title: "加入讨论组",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
__VLS_16.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "join-group" }));
const __VLS_17 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17(Object.assign({ modelValue: (__VLS_ctx.joinId), placeholder: "输入讨论组 ID", size: "small" }, { class: "join-input" })));
const __VLS_19 = __VLS_18(Object.assign({ modelValue: (__VLS_ctx.joinId), placeholder: "输入讨论组 ID", size: "small" }, { class: "join-input" }), ...__VLS_functionalComponentArgsRest(__VLS_18));
const __VLS_21 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", loading: (__VLS_ctx.joining) })));
const __VLS_23 = __VLS_22(Object.assign({ 'onClick': {} }, { type: "primary", size: "small", loading: (__VLS_ctx.joining) }), ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_25;
let __VLS_26;
let __VLS_27;
const __VLS_28 = {
    onClick: (__VLS_ctx.onJoin)
};
__VLS_24.slots.default;
var __VLS_24;
var __VLS_16;
var __VLS_12;
const __VLS_29 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29(Object.assign(Object.assign({ 'onSelect': {} }, { class: "group-menu" }), { defaultActive: (String(__VLS_ctx.selected)), router: (false) })));
const __VLS_31 = __VLS_30(Object.assign(Object.assign({ 'onSelect': {} }, { class: "group-menu" }), { defaultActive: (String(__VLS_ctx.selected)), router: (false) }), ...__VLS_functionalComponentArgsRest(__VLS_30));
let __VLS_33;
let __VLS_34;
let __VLS_35;
const __VLS_36 = {
    onSelect: (__VLS_ctx.select)
};
__VLS_32.slots.default;
for (const [g] of __VLS_getVForSourceType((__VLS_ctx.filteredGroups))) {
    const __VLS_37 = {}.ElMenuItem;
    /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        key: (g.id),
        index: (String(g.id)),
    }));
    const __VLS_39 = __VLS_38({
        key: (g.id),
        index: (String(g.id)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_40.slots.default;
    (g.title);
    var __VLS_40;
}
var __VLS_32;
if (__VLS_ctx.filteredGroups.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "empty" }));
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['group-list-card']} */ ;
/** @type {__VLS_StyleScopedClasses['panel-title']} */ ;
/** @type {__VLS_StyleScopedClasses['search-input']} */ ;
/** @type {__VLS_StyleScopedClasses['join-collapse']} */ ;
/** @type {__VLS_StyleScopedClasses['join-group']} */ ;
/** @type {__VLS_StyleScopedClasses['join-input']} */ ;
/** @type {__VLS_StyleScopedClasses['group-menu']} */ ;
/** @type {__VLS_StyleScopedClasses['empty']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            filter: filter,
            joinId: joinId,
            joining: joining,
            joinActive: joinActive,
            filteredGroups: filteredGroups,
            onJoin: onJoin,
            select: select,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
