var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import Navbar from '@/components/Navbar.vue';
import request from '@/utils/request';
// Tab 状态
const activeTab = ref('joined');
// 我已加入 / 可加入 的列表
const groupsJoined = ref([]);
const groupsJoin = ref([]);
// 当前选择的讨论组
const selectedGroupId = ref(null);
// 消息与分页
const messages = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(10);
const draft = ref('');
// 根据 Tab 计算要展示哪个列表
const displayedGroups = computed(() => activeTab.value === 'joined' ? groupsJoined.value : groupsJoin.value);
// 时间格式化，只保留 “年-月-日 时:分”
function formatDate(ts) {
    const [d, t] = ts.split('T');
    return `${d} ${t.slice(0, 5)}`;
}
// —— API 调用 ——
// 拉 “我已加入” 列表，500 错误当成空列表
function fetchJoined() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const res = yield request.get('/discussions/my');
            groupsJoined.value = res.data;
        }
        catch (err) {
            if (((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) === 500) {
                groupsJoined.value = [];
            }
            else {
                ElMessage.error(((_c = (_b = err.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.message) || '加载已加入列表失败');
            }
        }
    });
}
// 拉 “可加入” 列表（模拟接口；后端若没有可删）
function fetchJoinable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield request.get('/discussions/available');
            groupsJoin.value = res.data;
        }
        catch (_a) {
            groupsJoin.value = [];
        }
    });
}
// 拉指定组的消息列表
function fetchMessages() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!selectedGroupId.value)
            return;
        try {
            const res = yield request.get(`/posts/${selectedGroupId.value}`, {
                params: { page: page.value - 1, size: size.value }
            });
            messages.value = res.data.content;
            total.value = res.data.totalElements;
        }
        catch (_a) {
            messages.value = [];
            total.value = 0;
        }
    });
}
// 加入讨论组
function joinGroup(id) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            yield request.post('/discussions/join', { discussionId: id });
            ElMessage.success('加入成功');
            yield fetchJoined();
            activeTab.value = 'joined';
            selectedGroupId.value = id;
        }
        catch (err) {
            ElMessage.error(((_b = (_a = err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || '加入失败');
        }
    });
}
// 发送新发言
function send() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!draft.value.trim() || !selectedGroupId.value)
            return;
        try {
            yield request.post('/discussions/post', {
                discussionId: selectedGroupId.value,
                content: draft.value.trim()
            });
            draft.value = '';
            yield fetchMessages();
        }
        catch (_a) {
            ElMessage.error('发送失败');
        }
    });
}
// 切 Tab
function switchTab(tab) {
    activeTab.value = tab.name;
    selectedGroupId.value = null;
    messages.value = [];
    total.value = 0;
}
// 选中一个组
function selectGroup(id) {
    selectedGroupId.value = id;
    fetchMessages();
}
// 分页变化
function onPageChange(p) {
    page.value = p;
    fetchMessages();
}
// 初始加载
onMounted(() => {
    fetchJoined();
    fetchJoinable();
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex flex-col h-screen" }));
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex flex-1 overflow-hidden" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)(Object.assign({ class: "w-64 border-r bg-white p-4 overflow-y-auto" }));
const __VLS_3 = {}.ElTabs;
/** @type {[typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, typeof __VLS_components.ElTabs, typeof __VLS_components.elTabs, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign({ 'onTabClick': {} }, { modelValue: (__VLS_ctx.activeTab) })));
const __VLS_5 = __VLS_4(Object.assign({ 'onTabClick': {} }, { modelValue: (__VLS_ctx.activeTab) }), ...__VLS_functionalComponentArgsRest(__VLS_4));
let __VLS_7;
let __VLS_8;
let __VLS_9;
const __VLS_10 = {
    onTabClick: (__VLS_ctx.switchTab)
};
__VLS_6.slots.default;
const __VLS_11 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11({
    label: "我已加入",
    name: "joined",
}));
const __VLS_13 = __VLS_12({
    label: "我已加入",
    name: "joined",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const __VLS_15 = {}.ElTabPane;
/** @type {[typeof __VLS_components.ElTabPane, typeof __VLS_components.elTabPane, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({
    label: "加入讨论组",
    name: "join",
}));
const __VLS_17 = __VLS_16({
    label: "加入讨论组",
    name: "join",
}, ...__VLS_functionalComponentArgsRest(__VLS_16));
var __VLS_6;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-4 space-y-2" }));
for (const [g] of __VLS_getVForSourceType((__VLS_ctx.displayedGroups))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign(Object.assign(Object.assign({ onClick: (...[$event]) => {
            __VLS_ctx.selectGroup(g.id);
        } }, { key: (g.id) }), { class: "flex justify-between items-center p-2 border rounded cursor-pointer hover:bg-blue-50" }), { class: ({ 'bg-blue-100': __VLS_ctx.selectedGroupId === g.id }) }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    (g.title);
    if (__VLS_ctx.activeTab === 'join') {
        const __VLS_19 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19(Object.assign({ 'onClick': {} }, { type: "primary", size: "mini" })));
        const __VLS_21 = __VLS_20(Object.assign({ 'onClick': {} }, { type: "primary", size: "mini" }), ...__VLS_functionalComponentArgsRest(__VLS_20));
        let __VLS_23;
        let __VLS_24;
        let __VLS_25;
        const __VLS_26 = {
            onClick: (...[$event]) => {
                if (!(__VLS_ctx.activeTab === 'join'))
                    return;
                __VLS_ctx.joinGroup(g.id);
            }
        };
        __VLS_22.slots.default;
        var __VLS_22;
    }
}
if (__VLS_ctx.displayedGroups.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "mt-8 text-center text-gray-500" }));
    const __VLS_27 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        description: (__VLS_ctx.activeTab === 'joined' ? '暂无已加入讨论组' : '暂无可加入讨论组'),
    }));
    const __VLS_29 = __VLS_28({
        description: (__VLS_ctx.activeTab === 'joined' ? '暂无已加入讨论组' : '暂无可加入讨论组'),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(Object.assign({ class: "flex-1 flex flex-col bg-gray-50 p-4" }));
if (!__VLS_ctx.selectedGroupId) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex-1 flex items-center justify-center" }));
    const __VLS_31 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        description: "请选择讨论组",
    }));
    const __VLS_33 = __VLS_32({
        description: "请选择讨论组",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex flex-col flex-1" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex-1 overflow-y-auto pr-2 mb-4 bg-white p-4 rounded" }));
    for (const [msg] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ key: (msg.id) }, { class: "mb-4 border-b pb-2 last:border-none" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "text-gray-800" }));
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "font-medium" }));
        (msg.username);
        (msg.content);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "text-gray-500 text-sm" }));
        (__VLS_ctx.formatDate(msg.createdAt));
    }
    if (__VLS_ctx.messages.length === 0) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "py-12 text-center text-gray-500" }));
        const __VLS_35 = {}.ElEmpty;
        /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
        // @ts-ignore
        const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35({
            description: "暂无发言",
        }));
        const __VLS_37 = __VLS_36({
            description: "暂无发言",
        }, ...__VLS_functionalComponentArgsRest(__VLS_36));
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex items-center justify-between mb-4 flex-shrink-0" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (__VLS_ctx.total);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "flex items-center space-x-2" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_39 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39(Object.assign({ modelValue: (__VLS_ctx.size) }, { class: "w-20" })));
    const __VLS_41 = __VLS_40(Object.assign({ modelValue: (__VLS_ctx.size) }, { class: "w-20" }), ...__VLS_functionalComponentArgsRest(__VLS_40));
    __VLS_42.slots.default;
    for (const [s] of __VLS_getVForSourceType(([5, 10, 20]))) {
        const __VLS_43 = {}.ElOption;
        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
            key: (s),
            label: (s),
            value: (s),
        }));
        const __VLS_45 = __VLS_44({
            key: (s),
            label: (s),
            value: (s),
        }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    }
    var __VLS_42;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    const __VLS_47 = {}.ElPagination;
    /** @type {[typeof __VLS_components.ElPagination, typeof __VLS_components.elPagination, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47(Object.assign(Object.assign({ 'onCurrentChange': {} }, { currentPage: (__VLS_ctx.page), pageSize: (__VLS_ctx.size), total: (__VLS_ctx.total), layout: "prev, pager, next", background: true }), { class: "ml-2" })));
    const __VLS_49 = __VLS_48(Object.assign(Object.assign({ 'onCurrentChange': {} }, { currentPage: (__VLS_ctx.page), pageSize: (__VLS_ctx.size), total: (__VLS_ctx.total), layout: "prev, pager, next", background: true }), { class: "ml-2" }), ...__VLS_functionalComponentArgsRest(__VLS_48));
    let __VLS_51;
    let __VLS_52;
    let __VLS_53;
    const __VLS_54 = {
        onCurrentChange: (__VLS_ctx.onPageChange)
    };
    var __VLS_50;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "space-y-2 flex-shrink-0 bg-white p-4 rounded" }));
    const __VLS_55 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55({
        modelValue: (__VLS_ctx.draft),
        type: "textarea",
        rows: (3),
        placeholder: "输入发言…",
    }));
    const __VLS_57 = __VLS_56({
        modelValue: (__VLS_ctx.draft),
        type: "textarea",
        rows: (3),
        placeholder: "输入发言…",
    }, ...__VLS_functionalComponentArgsRest(__VLS_56));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "text-right" }));
    const __VLS_59 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59(Object.assign({ 'onClick': {} }, { type: "primary" })));
    const __VLS_61 = __VLS_60(Object.assign({ 'onClick': {} }, { type: "primary" }), ...__VLS_functionalComponentArgsRest(__VLS_60));
    let __VLS_63;
    let __VLS_64;
    let __VLS_65;
    const __VLS_66 = {
        onClick: (__VLS_ctx.send)
    };
    __VLS_62.slots.default;
    var __VLS_62;
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['w-64']} */ ;
/** @type {__VLS_StyleScopedClasses['border-r']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['p-2']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:bg-blue-50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-blue-100']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gray-50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['pr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-b']} */ ;
/** @type {__VLS_StyleScopedClasses['pb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['last:border-none']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-800']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['py-12']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gray-500']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-2']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-white']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            activeTab: activeTab,
            selectedGroupId: selectedGroupId,
            messages: messages,
            total: total,
            page: page,
            size: size,
            draft: draft,
            displayedGroups: displayedGroups,
            formatDate: formatDate,
            joinGroup: joinGroup,
            send: send,
            switchTab: switchTab,
            selectGroup: selectGroup,
            onPageChange: onPageChange,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
