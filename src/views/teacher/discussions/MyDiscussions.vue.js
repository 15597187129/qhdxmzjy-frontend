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
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '@/utils/request';
const router = useRouter();
const discussions = ref([]);
const loading = ref(false);
function fetchDiscussions() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        loading.value = true;
        try {
            const res = yield request.get('/discussions/created');
            discussions.value = res.data.map(item => {
                var _a, _b;
                // 优先取 created_at，再取 createdAt
                const raw = (_b = (_a = item.created_at) !== null && _a !== void 0 ? _a : item.createdAt) !== null && _b !== void 0 ? _b : '';
                // 截取前 10 个字符：YYYY-MM-DD
                const dateOnly = raw.slice(0, 10);
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    createDate: dateOnly
                };
            });
        }
        catch (err) {
            console.error('加载讨论组失败', err);
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加载讨论组失败');
        }
        finally {
            loading.value = false;
        }
    });
}
function goCreate() {
    router.push('/teacher/discussions/create');
}
function goMembers(id) {
    router.push(`/teacher/discussions/members?groupId=${id}`);
}
function goMessages(id) {
    router.push(`/teacher/discussions/messages?groupId=${id}`);
}
function deleteDiscussion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            yield ElMessageBox.confirm('确认删除此讨论组？', '提示', {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning'
            });
            loading.value = true;
            yield request.delete(`/discussions/${id}`);
            ElMessage.success('删除成功');
            fetchDiscussions();
        }
        catch (err) {
            if (err !== 'cancel') {
                console.error('删除失败', err);
                ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '删除失败');
            }
        }
        finally {
            loading.value = false;
        }
    });
}
onMounted(fetchDiscussions);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "p-6" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex justify-between items-center mb-4" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "text-2xl font-bold" }));
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0(Object.assign({ 'onClick': {} }, { type: "primary", disabled: (__VLS_ctx.loading) })));
const __VLS_2 = __VLS_1(Object.assign({ 'onClick': {} }, { type: "primary", disabled: (__VLS_ctx.loading) }), ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (__VLS_ctx.goCreate)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8(Object.assign({ data: (__VLS_ctx.discussions), stripe: true }, { style: {} })));
const __VLS_10 = __VLS_9(Object.assign({ data: (__VLS_ctx.discussions), stripe: true }, { style: {} }), ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.loading) }), null, null);
__VLS_11.slots.default;
const __VLS_12 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    prop: "id",
    label: "编号",
    width: "100",
}));
const __VLS_14 = __VLS_13({
    prop: "id",
    label: "编号",
    width: "100",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    prop: "title",
    label: "组名",
}));
const __VLS_18 = __VLS_17({
    prop: "title",
    label: "组名",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "description",
    label: "描述",
}));
const __VLS_22 = __VLS_21({
    prop: "description",
    label: "描述",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    prop: "createDate",
    label: "创建日期",
    width: "120",
}));
const __VLS_26 = __VLS_25({
    prop: "createDate",
    label: "创建日期",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "操作",
}));
const __VLS_30 = __VLS_29({
    label: "操作",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32(Object.assign({ 'onClick': {} }, { type: "text", size: "small" })));
    const __VLS_34 = __VLS_33(Object.assign({ 'onClick': {} }, { type: "text", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (...[$event]) => {
            __VLS_ctx.goMembers(row.id);
        }
    };
    __VLS_35.slots.default;
    var __VLS_35;
    const __VLS_40 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40(Object.assign({ 'onClick': {} }, { type: "text", size: "small" })));
    const __VLS_42 = __VLS_41(Object.assign({ 'onClick': {} }, { type: "text", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (...[$event]) => {
            __VLS_ctx.goMessages(row.id);
        }
    };
    __VLS_43.slots.default;
    var __VLS_43;
    const __VLS_48 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48(Object.assign({ 'onClick': {} }, { type: "text", size: "small", disabled: (__VLS_ctx.loading) })));
    const __VLS_50 = __VLS_49(Object.assign({ 'onClick': {} }, { type: "text", size: "small", disabled: (__VLS_ctx.loading) }), ...__VLS_functionalComponentArgsRest(__VLS_49));
    let __VLS_52;
    let __VLS_53;
    let __VLS_54;
    const __VLS_55 = {
        onClick: (...[$event]) => {
            __VLS_ctx.deleteDiscussion(row.id);
        }
    };
    __VLS_51.slots.default;
    var __VLS_51;
}
var __VLS_31;
var __VLS_11;
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            discussions: discussions,
            loading: loading,
            goCreate: goCreate,
            goMembers: goMembers,
            goMessages: goMessages,
            deleteDiscussion: deleteDiscussion,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
