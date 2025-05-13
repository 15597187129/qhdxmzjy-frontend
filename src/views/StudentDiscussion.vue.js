import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import GroupList from '@/components/GroupList.vue';
import ChatPanel from '@/components/ChatPanel.vue';
/** 当前选中的讨论组 ID，null 表示未选 */
const currentGroupId = ref(null);
/** 加入成功后自动选中该组 */
function onJoined(id) {
    currentGroupId.value = id;
}
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['no-group-placeholder']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "student-discussion" }));
/** @type {[typeof Navbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(Navbar, new Navbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "group-panel" }));
/** @type {[typeof GroupList, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(GroupList, new GroupList(Object.assign({ 'onJoined': {} }, { selected: (__VLS_ctx.currentGroupId) })));
const __VLS_4 = __VLS_3(Object.assign({ 'onJoined': {} }, { selected: (__VLS_ctx.currentGroupId) }), ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onJoined: (__VLS_ctx.onJoined)
};
var __VLS_5;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "chat-panel" }));
if (__VLS_ctx.currentGroupId !== null) {
    /** @type {[typeof ChatPanel, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(ChatPanel, new ChatPanel(Object.assign({ 'onLeft': {} }, { groupId: (__VLS_ctx.currentGroupId) })));
    const __VLS_11 = __VLS_10(Object.assign({ 'onLeft': {} }, { groupId: (__VLS_ctx.currentGroupId) }), ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onLeft: (...[$event]) => {
            if (!(__VLS_ctx.currentGroupId !== null))
                return;
            __VLS_ctx.currentGroupId = null;
        }
    };
    var __VLS_12;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "no-group-placeholder" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
}
/** @type {__VLS_StyleScopedClasses['student-discussion']} */ ;
/** @type {__VLS_StyleScopedClasses['group-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['chat-panel']} */ ;
/** @type {__VLS_StyleScopedClasses['no-group-placeholder']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Navbar: Navbar,
            GroupList: GroupList,
            ChatPanel: ChatPanel,
            currentGroupId: currentGroupId,
            onJoined: onJoined,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
