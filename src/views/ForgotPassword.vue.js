var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const email = ref('');
const code = ref('');
const newPassword = ref('');
const showCodeAndPassword = ref(false); // 控制是否显示验证码和新密码框
const isSubmitting = ref(false); // 控制重置密码按钮的状态
const sending = ref(false); // 发送验证码按钮的状态
const countdown = ref(60);
let timer = null;
const router = useRouter(); // 获取路由实例
// 发送验证码函数
const sendResetCode = () => __awaiter(void 0, void 0, void 0, function* () {
    if (email.value) {
        alert('验证码已发送，请查收邮箱');
        showCodeAndPassword.value = true; // 显示验证码和新密码框
        sending.value = true;
        countdown.value = 60;
        timer = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0) {
                sending.value = false;
                clearInterval(timer);
            }
        }, 1000);
        try {
            const response = yield fetch('http://192.168.127.128:8888/api/auth/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.value })
            });
            const result = yield response.json();
            if (response.ok) {
                alert(result.message || '验证码已发送，请查收邮箱');
            }
            else {
                alert(result.message || '发送失败，请稍后再试');
            }
        }
        catch (error) {
            alert('发送验证码失败，请稍后再试');
        }
    }
    else {
        alert('请输入有效的邮箱');
    }
});
// 模拟重置密码
const resetPassword = () => __awaiter(void 0, void 0, void 0, function* () {
    if (code.value && newPassword.value) {
        // 提交重置密码请求
        try {
            const response = yield fetch('http://192.168.127.128:8888/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.value,
                    code: code.value,
                    newPassword: newPassword.value
                })
            });
            const result = yield response.json();
            if (response.ok) {
                alert('密码重置成功');
                // 成功后跳转到主页
                router.push('/login');
            }
            else {
                alert(result.message || '密码重置失败');
            }
        }
        catch (error) {
            alert('密码重置失败，请稍后再试');
        }
    }
    else {
        alert('请填写完整信息');
    }
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "forgot-password-page" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "forgot-password-card" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "branding" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)(Object.assign({ src: "/logo.png", alt: "logo" }, { class: "logo" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)(Object.assign({ class: "platform-name" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)(Object.assign({ class: "platform-desc" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)(Object.assign({ class: "section-title" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "input-wrapper" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "email",
    placeholder: "请输入注册邮箱",
    required: true,
});
(__VLS_ctx.email);
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (__VLS_ctx.sendResetCode) }, { class: "code-btn" }), { disabled: (__VLS_ctx.sending) }));
(__VLS_ctx.sending ? __VLS_ctx.countdown + 's' : '发送验证码');
if (__VLS_ctx.showCodeAndPassword) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "input-wrapper" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        value: (__VLS_ctx.code),
        type: "text",
        placeholder: "请输入验证码",
        required: true,
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(Object.assign({ class: "input-wrapper" }));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "password",
        placeholder: "请输入新密码",
        required: true,
    });
    (__VLS_ctx.newPassword);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(Object.assign(Object.assign({ onClick: (__VLS_ctx.resetPassword) }, { class: "submit-btn" }), { type: "submit", disabled: (__VLS_ctx.isSubmitting) }));
}
/** @type {__VLS_StyleScopedClasses['forgot-password-page']} */ ;
/** @type {__VLS_StyleScopedClasses['forgot-password-card']} */ ;
/** @type {__VLS_StyleScopedClasses['branding']} */ ;
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-name']} */ ;
/** @type {__VLS_StyleScopedClasses['platform-desc']} */ ;
/** @type {__VLS_StyleScopedClasses['section-title']} */ ;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['code-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['input-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['submit-btn']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            email: email,
            code: code,
            newPassword: newPassword,
            showCodeAndPassword: showCodeAndPassword,
            isSubmitting: isSubmitting,
            sending: sending,
            countdown: countdown,
            sendResetCode: sendResetCode,
            resetPassword: resetPassword,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
