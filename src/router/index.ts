import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// —— 认证相关 —— //
import Login          from '@/views/login/Login.vue'
import Register       from '@/views/register/Register.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

// —— 学生端页面 —— //
import Home                 from '@/views/Home.vue'
import Profile              from '@/views/Profile.vue'
import Quiz                 from '@/views/Quiz.vue'
import Panorama             from '@/views/Panorama.vue'
import StudentDiscussion    from '@/views/StudentDiscussion.vue'
import StudentVideos        from '@/views/StudentVideos.vue'

// —— 单独的答题播放页（懒加载） —— //
const QuizPlay = () => import('@/views/QuizPlay.vue')

// —— 教师端布局 & 子页面 —— //
import TeacherLayout       from '@/views/TeacherLayout.vue'
import TeacherDashboard    from '@/views/TeacherDashboard.vue'
import TeacherDiscussions  from '@/views/TeacherDiscussions.vue'
import TeacherVideos       from '@/views/TeacherVideos.vue'

// 讨论管理子页
import MyDiscussions           from '@/views/teacher/discussions/MyDiscussions.vue'
import CreateDiscussion        from '@/views/teacher/discussions/CreateDiscussion.vue'
import DiscussionMembersPage   from '@/views/teacher/discussions/DiscussionMembersPage.vue'
import DiscussionMessagesPage  from '@/views/teacher/discussions/DiscussionMessagesPage.vue'

// —— 题库管理子页（懒加载） —— //
const QuizImport    = () => import('@/views/teacher/QuizImport.vue')
const QuizQuestions = () => import('@/views/teacher/QuizQuestions.vue')
const QuizRanking   = () => import('@/views/teacher/QuizRanking.vue')

// —— 全景图片管理子页 —— //
import MyPanoramas       from '@/views/teacher/panorama/MyPanoramas.vue'
import UploadPanorama    from '@/views/teacher/panorama/UploadPanorama.vue'

// —— 视频管理子页 —— //
import TeacherVideosList from '@/views/teacher/videos/TeacherVideos.vue'
import UploadVideo       from '@/views/teacher/videos/UploadVideo.vue'

// —— 管理员端布局 & 子页面 —— //
import AdminLayout      from '@/views/AdminLayout.vue'
import AdminDashboard   from '@/views/AdminDashboard.vue'
import Users            from '@/views/admin/Users.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', redirect: '/login' },
    { path: '/login',    name: 'login',    component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/recover',  name: 'recover',  component: ForgotPassword },

    // —— 学生端主功能 —— //
    { path: '/home',        name: 'home',        component: Home },
    { path: '/profile',     name: 'profile',     component: Profile },
    { path: '/daily-quiz',  name: 'daily-quiz',  component: Quiz },
    { path: '/daily-quiz/play', name: 'QuizPlay', component: QuizPlay },
    { path: '/panorama',    name: 'panorama',    component: Panorama },
    { path: '/panorama/view/:id', name: 'panorama-viewer', component: () => import('@/views/student/PanoramaViewer.vue') },
    { path: '/discussions', name: 'student-discussions', component: StudentDiscussion },
    { path: '/videos',      name: 'videos',      component: StudentVideos },

    // —— 教师端 —— //
    {
        path: '/teacher',
        component: TeacherLayout,
        children: [
            { path: '',            redirect: 'dashboard' },
            { path: 'dashboard',   name: 'teacher-dashboard',   component: TeacherDashboard },

            {
                path: 'discussions',
                name: 'teacher-discussions',
                component: TeacherDiscussions,
                children: [
                    { path: '',         name: 'teacher-discussions-list',   component: MyDiscussions },
                    { path: 'create',   name: 'teacher-discussions-create', component: CreateDiscussion },
                    { path: 'members',  name: 'teacher-discussions-members',component: DiscussionMembersPage },
                    { path: 'messages', name: 'teacher-discussions-messages',component: DiscussionMessagesPage }
                ]
            },

            // 视频管理
            {
                path: 'videos',
                name: 'teacher-videos',
                children: [
                    { path: '',        name: 'teacher-videos-list', component: TeacherVideosList },
                    { path: 'upload',  name: 'teacher-upload-video', component: UploadVideo },
                ]
            },

            { path: 'import',    name: 'QuizImport',         component: QuizImport },
            { path: 'questions', name: 'QuizQuestions',      component: QuizQuestions },
            { path: 'ranking',   name: 'QuizRanking',        component: QuizRanking },

            // —— 全景图片管理 —— //
            {
                path: 'panorama',
                name: 'teacher-panorama',
                children: [
                    { path: '',        name: 'teacher-my-panoramas', component: MyPanoramas },
                    { path: 'upload',  name: 'teacher-upload-panorama', component: UploadPanorama },
                ]
            },
        ]
    },

    // —— 管理员端 —— //
    {
        path: '/admin',
        component: AdminLayout,
        children: [
            { path: '',          redirect: 'dashboard' },
            { path: 'dashboard', name: 'admin-dashboard', component: AdminDashboard },
            { path: 'users',     name: 'admin-users',     component: Users }
        ]
    },

    // 404 捕获
    { path: '/:catchAll(.*)', redirect: '/login' }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
