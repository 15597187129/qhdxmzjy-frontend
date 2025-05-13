var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, onMounted, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import request from '@/utils/request';
const groups = ref([]);
const selectedGroupId = ref(null);
const messages = ref([]);
const totalItems = ref(0);
const currentPage = ref(1);
const pageSize = ref(10);
const newMessage = ref('');
const loadingGroups = ref(false);
const loadingMessages = ref(false);
const posting = ref(false);
// 只保留 “年-月-日 时:分”
function formatDate(ts) {
    const [date, time] = ts.split('T');
    return `${date} ${time.slice(0, 5)}`;
}
// 拉取教师创建的讨论组
function fetchGroups() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        loadingGroups.value = true;
        try {
            const res = yield request.get('/discussions/created');
            groups.value = res.data;
        }
        catch (err) {
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加载讨论组失败');
        }
        finally {
            loadingGroups.value = false;
        }
    });
}
// 拉取某组分页发言
function fetchMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!selectedGroupId.value)
            return;
        loadingMessages.value = true;
        try {
            const res = yield request.get(`/posts/${selectedGroupId.value}`, {
                params: {
                    page: currentPage.value - 1,
                    size: pageSize.value
                }
            });
            messages.value = res.data.content;
            totalItems.value = res.data.totalElements;
        }
        catch (err) {
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加载发言失败');
            messages.value = [];
            totalItems.value = 0;
        }
        finally {
            loadingMessages.value = false;
        }
    });
}
// 选组后重置分页并拉取
function onGroupChange() {
    currentPage.value = 1;
    fetchMessages();
}
// 页码/页大小变化
function onPageChange(page) {
    currentPage.value = page;
    fetchMessages();
}
function onSizeChange(size) {
    pageSize.value = size;
    currentPage.value = 1;
    fetchMessages();
}
// 删除发言
function onDelete(postId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield ElMessageBox.confirm('确认删除该发言？', '提示', { type: 'warning' });
            yield request.delete(`/discussions/posts/${postId}`);
            ElMessage.success('删除成功');
            fetchMessages();
        }
        catch (err) {
            if (err !== 'cancel')
                ElMessage.error('删除失败');
        }
    });
}
// 发送发言
function onSend() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!selectedGroupId.value)
            return;
        posting.value = true;
        try {
            yield request.post('/discussions/post', {
                discussionId: selectedGroupId.value,
                content: newMessage.value.trim()
            });
            ElMessage.success('发送成功');
            newMessage.value = '';
            currentPage.value = 1;
            fetchMessages();
        }
        catch (err) {
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '发送失败');
        }
        finally {
            posting.value = false;
        }
    });
}
// 初始加载
onMounted(fetchGroups);
// 当分页或组ID变化，自动刷新
watch([currentPage, pageSize], () => {
    if (selectedGroupId.value) {
        fetchMessages();
    }
});
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
if (!__VLS_ctx.selectedGroupId && !__VLS_ctx.loadingMessages) {
    const __VLS_12 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        description: "请选择一个讨论组查看发言",
    }));
    const __VLS_14 = __VLS_13({
        description: "请选择一个讨论组查看发言",
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    const __VLS_16 = {}.ElTable;
    /** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16(Object.assign(Object.assign({ data: (__VLS_ctx.messages), stripe: true }, { style: {} }), { class: "mb-4" })));
    const __VLS_18 = __VLS_17(Object.assign(Object.assign({ data: (__VLS_ctx.messages), stripe: true }, { style: {} }), { class: "mb-4" }), ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_asFunctionalDirective(__VLS_directives.vLoading)(null, Object.assign(Object.assign({}, __VLS_directiveBindingRestFields), { value: (__VLS_ctx.loadingMessages) }), null, null);
    __VLS_19.slots.default;
    const __VLS_20 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        prop: "username",
        label: "用户名",
        width: "120",
    }));
    const __VLS_22 = __VLS_21({
        prop: "username",
        label: "用户名",
        width: "120",
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    const __VLS_24 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        prop: "content",
        label: "内容",
    }));
    const __VLS_26 = __VLS_25({
        prop: "content",
        label: "内容",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    const __VLS_28 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
        label: "时间",
        width: "160",
    }));
    const __VLS_30 = __VLS_29({
        label: "时间",
        width: "160",
    }, ...__VLS_functionalComponentArgsRest(__VLS_29));
    __VLS_31.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_31.slots;
        const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
        (__VLS_ctx.formatDate(row.createdAt));
    }
    var __VLS_31;
    const __VLS_32 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        label: "操作",
        width: "100",
    }));
    const __VLS_34 = __VLS_33({
        label: "操作",
        width: "100",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_35.slots;
        const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
        const __VLS_36 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36(Object.assign({ 'onClick': {} }, { type: "text", size: "small" })));
        const __VLS_38 = __VLS_37(Object.assign({ 'onClick': {} }, { type: "text", size: "small" }), ...__VLS_functionalComponentArgsRest(__VLS_37));
        let __VLS_40;
        let __VLS_41;
        let __VLS_42;
        const __VLS_43 = {
            onClick: (...[$event]) => {
                if (!!(!__VLS_ctx.selectedGroupId && !__VLS_ctx.loadingMessages))
                    return;
                __VLS_ctx.onDelete(row.id);
            }
        };
        __VLS_39.slots.default;
        var __VLS_39;
    }
    var __VLS_35;
    var __VLS_19;
    const __VLS_44 = {}.ElPagination;
    /** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44(Object.assign(Object.assign(Object.assign({ 'onCurrentChange': {} }, { 'onSizeChange': {} }), { currentPage: (__VLS_ctx.currentPage), pageSize: (__VLS_ctx.pageSize), pageSizes: ([5, 10, 20]), layout: "total, sizes, prev, pager, next", total: (__VLS_ctx.totalItems), background: true }), { class: "mb-6" })));
    const __VLS_46 = __VLS_45(Object.assign(Object.assign(Object.assign({ 'onCurrentChange': {} }, { 'onSizeChange': {} }), { currentPage: (__VLS_ctx.currentPage), pageSize: (__VLS_ctx.pageSize), pageSizes: ([5, 10, 20]), layout: "total, sizes, prev, pager, next", total: (__VLS_ctx.totalItems), background: true }), { class: "mb-6" }), ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onCurrentChange: (__VLS_ctx.onPageChange)
    };
    const __VLS_52 = {
        onSizeChange: (__VLS_ctx.onSizeChange)
    };
    var __VLS_47;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mb-2" }));
    const __VLS_53 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
        modelValue: (__VLS_ctx.newMessage),
        type: "textarea",
        rows: (3),
        placeholder: "输入新发言……",
    }));
    const __VLS_55 = __VLS_54({
        modelValue: (__VLS_ctx.newMessage),
        type: "textarea",
        rows: (3),
        placeholder: "输入新发言……",
    }, ...__VLS_functionalComponentArgsRest(__VLS_54));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex justify-end" }));
    const __VLS_57 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.posting), disabled: (!__VLS_ctx.newMessage.trim()) })));
    const __VLS_59 = __VLS_58(Object.assign({ 'onClick': {} }, { type: "primary", loading: (__VLS_ctx.posting), disabled: (!__VLS_ctx.newMessage.trim()) }), ...__VLS_functionalComponentArgsRest(__VLS_58));
    let __VLS_61;
    let __VLS_62;
    let __VLS_63;
    const __VLS_64 = {
        onClick: (__VLS_ctx.onSend)
    };
    __VLS_60.slots.default;
    var __VLS_60;
}
/** @type {__VLS_StyleScopedClasses['p-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-end']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            groups: groups,
            selectedGroupId: selectedGroupId,
            messages: messages,
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            newMessage: newMessage,
            loadingGroups: loadingGroups,
            loadingMessages: loadingMessages,
            posting: posting,
            formatDate: formatDate,
            onGroupChange: onGroupChange,
            onPageChange: onPageChange,
            onSizeChange: onSizeChange,
            onDelete: onDelete,
            onSend: onSend,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
