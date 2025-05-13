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
import { ElMessage } from 'element-plus';
const groups = ref([]);
const members = ref([]);
const selectedGroupId = ref(null);
const loadingGroups = ref(false);
const loadingMembers = ref(false);
// 拉教师自己创建的讨论组
function fetchGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        loadingGroups.value = true;
        try {
            const res = yield request.get('/discussions/created');
            groups.value = res.data;
        }
        catch (err) {
            console.error('获取讨论组列表失败', err);
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加载讨论组失败');
        }
        finally {
            loadingGroups.value = false;
        }
    });
}
// 拉某个讨论组的成员
function fetchMembers(groupId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        loadingMembers.value = true;
        try {
            const res = yield request.get(`/discussions/${groupId}/members`);
            members.value = res.data;
        }
        catch (err) {
            console.error('获取成员列表失败', err);
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加载成员失败');
            members.value = [];
        }
        finally {
            loadingMembers.value = false;
        }
    });
}
// 组改变时触发
function onGroupChange(id) {
    members.value = [];
    fetchMembers(id);
}
// 初始加载组列表
onMounted(fetchGroups);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "p-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "text-2xl font-bold mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mb-4" }));
const __VLS_0 = {}.ElSelect;
/** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign(Object.assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.selectedGroupId), placeholder: "请选择讨论组", filterable: true, loading: (__VLS_ctx.loadingGroups) }), { style: {} })));
const __VLS_2 = __VLS_1(Object.assign(Object.assign({ 'onChange': {} }, { modelValue: (__VLS_ctx.selectedGroupId), placeholder: "请选择讨论组", filterable: true, loading: (__VLS_ctx.loadingGroups) }), { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onChange: (__VLS_ctx.onGroupChange)
};
__VLS_3.slots.default;
for (const [g] of __VLS_getVForSourceType((__VLS_ctx.groups))) {
    const __VLS_8 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        key: (g.id),
        label: (g.title),
        value: (g.id),
    }));
    const __VLS_10 = __VLS_9({
        key: (g.id),
        label: (g.title),
        value: (g.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
}
var __VLS_3;
if (!__VLS_ctx.selectedGroupId && !__VLS_ctx.loadingMembers) {
    const __VLS_12 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        description: "请选择一个讨论组查看成员",
    }));
    const __VLS_14 = __VLS_13({
        description: "请选择一个讨论组查看成员",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
else {
    const __VLS_16 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign({ data: (__VLS_ctx.members), stripe: true }, { style: {} })));
    const __VLS_18 = __VLS_17(Object.assign({ data: (__VLS_ctx.members), stripe: true }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.loadingMembers) }), null, null);
    __VLS_19.slots.default;
    const __VLS_20 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        prop: "username",
        label: "用户名",
    }));
    const __VLS_22 = __VLS_21({
        prop: "username",
        label: "用户名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_24 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        prop: "role",
        label: "角色",
    }));
    const __VLS_26 = __VLS_25({
        prop: "role",
        label: "角色",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    var __VLS_19;
}
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            groups: groups,
            members: members,
            selectedGroupId: selectedGroupId,
            loadingGroups: loadingGroups,
            loadingMembers: loadingMembers,
            onGroupChange: onGroupChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
