import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from '../views/LoginView.vue'
import SignUp from '../views/SignUpView.vue'
import MainPage from "@/views/MainPage.vue";
import MyCourses from "@/views/MyCourses.vue";
import ProfileView from "@/views/ProfileView.vue";
import {profileStore} from "@/stores/profileStore";
import {authStore} from "@/stores/authStore";
import AdminPage from "@/views/AdminPage.vue";
import TeacherPage from "@/views/TeacherPage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: Login,
        beforeEnter: () => !authStore.tokens
    },
    {
        path: '/sign-up',
        component: SignUp,
        beforeEnter: () => !authStore.tokens
    },
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/profile',
        component: ProfileView,
        beforeEnter: () => Boolean(profileStore.profile)
    },
    {
        path: '/admin',
        component: AdminPage,
        beforeEnter: (): boolean => profileStore.profile?.role === 'ADMIN'
    },
    {
        path: '/teacher',
        component: TeacherPage,
        beforeEnter: (): boolean => profileStore.profile?.role === 'TEACHER'
    },
    {
        path: '/my-courses',
        component: MyCourses,
        beforeEnter: (): boolean => profileStore.profile?.role === 'STUDENT'
    }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
