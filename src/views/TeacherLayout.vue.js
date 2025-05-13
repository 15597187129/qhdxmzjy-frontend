import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import TeacherNavbar from '@/components/TeacherNavbar.vue';
import { Icon } from '@iconify/vue';
const route = useRoute();
// 一级菜单激活判定
const current = computed(() => {
    const p = route.path;
    if (p === '/teacher/dashboard')
        return 'dashboard';
    if (p.startsWith('/teacher/discussions'))
        return 'discussions';
    if (p.startsWith('/teacher/videos'))
        return 'videos';
    if (p.startsWith('/teacher/panorama'))
        return 'panorama';
    if (p === '/teacher/import' || p.startsWith('/teacher/questions') || p === '/teacher/ranking')
        return 'questions';
    return '';
});
// 菜单状态管理
const discussionsOpen = ref(false);
const questionsOpen = ref(false);
const videosOpen = ref(false);
const panoramaOpen = ref(false);
// 切换菜单展开状态
function toggleDiscussions() {
    discussionsOpen.value = !discussionsOpen.value;
}
function toggleQuestions() {
    questionsOpen.value = !questionsOpen.value;
}
function toggleVideos() {
    videosOpen.value = !videosOpen.value;
}
function togglePanorama() {
    panoramaOpen.value = !panoramaOpen.value;
}
watch(current, val => {
    discussionsOpen.value = (val === 'discussions');
    questionsOpen.value = (val === 'questions');
    videosOpen.value = (val === 'videos');
    panoramaOpen.value = (val === 'panorama');
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "teacher-layout" }));
/** @type {[typeof TeacherNavbar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(TeacherNavbar, new TeacherNavbar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "body" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.aside, __VLS_intrinsicElements.aside)(Object.assign({ class: "sidebar" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(Object.assign({ class: "menu" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.current === 'dashboard' }) }));
const __VLS_3 = {}.RouterLink;
/** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3(Object.assign({ to: "/teacher/dashboard" }, { class: "menu-link" })));
const __VLS_5 = __VLS_4(Object.assign({ to: "/teacher/dashboard" }, { class: "menu-link" }), ...__VLS_functionalComponentArgsRest(__VLS_4));
__VLS_6.slots.default;
const __VLS_7 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7(Object.assign({ icon: "mdi:view-dashboard" }, { class: "icon" })));
const __VLS_9 = __VLS_8(Object.assign({ icon: "mdi:view-dashboard" }, { class: "icon" }), ...__VLS_functionalComponentArgsRest(__VLS_8));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "label" }));
var __VLS_6;
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.current === 'discussions', open: __VLS_ctx.discussionsOpen }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.toggleDiscussions) }, { class: "menu-link discussions-parent" }));
const __VLS_11 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent(__VLS_11, new __VLS_11(Object.assign({ icon: "mdi:comment-multiple-outline" }, { class: "icon" })));
const __VLS_13 = __VLS_12(Object.assign({ icon: "mdi:comment-multiple-outline" }, { class: "icon" }), ...__VLS_functionalComponentArgsRest(__VLS_12));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "label" }));
const __VLS_15 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" })));
const __VLS_17 = __VLS_16(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" }), ...__VLS_functionalComponentArgsRest(__VLS_16));
if (__VLS_ctx.discussionsOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(Object.assign({ class: "submenu" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/discussions' }) }));
    const __VLS_19 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        to: "/teacher/discussions",
    }));
    const __VLS_21 = __VLS_20({
        to: "/teacher/discussions",
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    __VLS_22.slots.default;
    var __VLS_22;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/discussions/create' }) }));
    const __VLS_23 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent(__VLS_23, new __VLS_23({
        to: "/teacher/discussions/create",
    }));
    const __VLS_25 = __VLS_24({
        to: "/teacher/discussions/create",
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    __VLS_26.slots.default;
    var __VLS_26;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path.startsWith('/teacher/discussions/members') }) }));
    const __VLS_27 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({
        to: "/teacher/discussions/members",
    }));
    const __VLS_29 = __VLS_28({
        to: "/teacher/discussions/members",
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    __VLS_30.slots.default;
    var __VLS_30;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path.startsWith('/teacher/discussions/messages') }) }));
    const __VLS_31 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
        to: "/teacher/discussions/messages",
    }));
    const __VLS_33 = __VLS_32({
        to: "/teacher/discussions/messages",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    __VLS_34.slots.default;
    var __VLS_34;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.current === 'questions', open: __VLS_ctx.questionsOpen }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.toggleQuestions) }, { class: "menu-link questions-parent" }));
const __VLS_35 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent(__VLS_35, new __VLS_35(Object.assign({ icon: "mdi:format-list-bulleted" }, { class: "icon" })));
const __VLS_37 = __VLS_36(Object.assign({ icon: "mdi:format-list-bulleted" }, { class: "icon" }), ...__VLS_functionalComponentArgsRest(__VLS_36));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "label" }));
const __VLS_39 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent(__VLS_39, new __VLS_39(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" })));
const __VLS_41 = __VLS_40(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" }), ...__VLS_functionalComponentArgsRest(__VLS_40));
if (__VLS_ctx.questionsOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(Object.assign({ class: "submenu" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/import' }) }));
    const __VLS_43 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
        to: "/teacher/import",
    }));
    const __VLS_45 = __VLS_44({
        to: "/teacher/import",
    }, ...__VLS_functionalComponentArgsRest(__VLS_44));
    __VLS_46.slots.default;
    var __VLS_46;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path.startsWith('/teacher/questions') }) }));
    const __VLS_47 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_48 = __VLS_asFunctionalComponent(__VLS_47, new __VLS_47({
        to: "/teacher/questions",
    }));
    const __VLS_49 = __VLS_48({
        to: "/teacher/questions",
    }, ...__VLS_functionalComponentArgsRest(__VLS_48));
    __VLS_50.slots.default;
    var __VLS_50;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/ranking' }) }));
    const __VLS_51 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(__VLS_51, new __VLS_51({
        to: "/teacher/ranking",
    }));
    const __VLS_53 = __VLS_52({
        to: "/teacher/ranking",
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_54.slots.default;
    var __VLS_54;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.current === 'videos', open: __VLS_ctx.videosOpen }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.toggleVideos) }, { class: "menu-link videos-parent" }));
const __VLS_55 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent(__VLS_55, new __VLS_55(Object.assign({ icon: "mdi:video-outline" }, { class: "icon" })));
const __VLS_57 = __VLS_56(Object.assign({ icon: "mdi:video-outline" }, { class: "icon" }), ...__VLS_functionalComponentArgsRest(__VLS_56));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "label" }));
const __VLS_59 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent(__VLS_59, new __VLS_59(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" })));
const __VLS_61 = __VLS_60(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" }), ...__VLS_functionalComponentArgsRest(__VLS_60));
if (__VLS_ctx.videosOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(Object.assign({ class: "submenu" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/videos' }) }));
    const __VLS_63 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        to: "/teacher/videos",
    }));
    const __VLS_65 = __VLS_64({
        to: "/teacher/videos",
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_66.slots.default;
    var __VLS_66;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/videos/upload' }) }));
    const __VLS_67 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_68 = __VLS_asFunctionalComponent(__VLS_67, new __VLS_67({
        to: "/teacher/videos/upload",
    }));
    const __VLS_69 = __VLS_68({
        to: "/teacher/videos/upload",
    }, ...__VLS_functionalComponentArgsRest(__VLS_68));
    __VLS_70.slots.default;
    var __VLS_70;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.current === 'panorama', open: __VLS_ctx.panoramaOpen }) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ onClick: (__VLS_ctx.togglePanorama) }, { class: "menu-link panorama-parent" }));
const __VLS_71 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_72 = __VLS_asFunctionalComponent(__VLS_71, new __VLS_71(Object.assign({ icon: "mdi:image" }, { class: "icon" })));
const __VLS_73 = __VLS_72(Object.assign({ icon: "mdi:image" }, { class: "icon" }), ...__VLS_functionalComponentArgsRest(__VLS_72));
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)(Object.assign({ class: "label" }));
const __VLS_75 = {}.Icon;
/** @type {[typeof __VLS_components.Icon, ]} */ ;
// @ts-ignore
const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" })));
const __VLS_77 = __VLS_76(Object.assign({ icon: "mdi:chevron-down" }, { class: "chevron" }), ...__VLS_functionalComponentArgsRest(__VLS_76));
if (__VLS_ctx.panoramaOpen) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)(Object.assign({ class: "submenu" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/panorama' }) }));
    const __VLS_79 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_80 = __VLS_asFunctionalComponent(__VLS_79, new __VLS_79({
        to: "/teacher/panorama",
    }));
    const __VLS_81 = __VLS_80({
        to: "/teacher/panorama",
    }, ...__VLS_functionalComponentArgsRest(__VLS_80));
    __VLS_82.slots.default;
    var __VLS_82;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.li, __VLS_intrinsicElements.li)(Object.assign({ class: ({ active: __VLS_ctx.route.path === '/teacher/panorama/upload' }) }));
    const __VLS_83 = {}.RouterLink;
    /** @type {[typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, typeof __VLS_components.RouterLink, typeof __VLS_components.routerLink, ]} */ ;
    // @ts-ignore
    const __VLS_84 = __VLS_asFunctionalComponent(__VLS_83, new __VLS_83({
        to: "/teacher/panorama/upload",
    }));
    const __VLS_85 = __VLS_84({
        to: "/teacher/panorama/upload",
    }, ...__VLS_functionalComponentArgsRest(__VLS_84));
    __VLS_86.slots.default;
    var __VLS_86;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)(Object.assign({ class: "main-content" }));
const __VLS_87 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({}));
const __VLS_89 = __VLS_88({}, ...__VLS_functionalComponentArgsRest(__VLS_88));
/** @type {__VLS_StyleScopedClasses['teacher-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['body']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
/** @type {__VLS_StyleScopedClasses['menu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['open']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['discussions-parent']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['open']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['questions-parent']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['open']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['videos-parent']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['open']} */ ;
/** @type {__VLS_StyleScopedClasses['menu-link']} */ ;
/** @type {__VLS_StyleScopedClasses['panorama-parent']} */ ;
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
/** @type {__VLS_StyleScopedClasses['label']} */ ;
/** @type {__VLS_StyleScopedClasses['chevron']} */ ;
/** @type {__VLS_StyleScopedClasses['submenu']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['main-content']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            TeacherNavbar: TeacherNavbar,
            Icon: Icon,
            route: route,
            current: current,
            discussionsOpen: discussionsOpen,
            questionsOpen: questionsOpen,
            videosOpen: videosOpen,
            panoramaOpen: panoramaOpen,
            toggleDiscussions: toggleDiscussions,
            toggleQuestions: toggleQuestions,
            toggleVideos: toggleVideos,
            togglePanorama: togglePanorama,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
