import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MainPage from "@/views/MainPage.vue";
import MyCourses from "@/views/MyCourses.vue";
import ProfilePage from "@/views/ProfilePage.vue";
import {profileStore} from "@/stores/profileStore";
import AdminPage from "@/views/AdminPage.vue";
import TeacherPage from "@/views/TeacherPage.vue";
import AdminCourses from "@/components/AdminCourses.vue";
import AdminUsers from "@/components/AdminUsers.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/profile',
        component: ProfilePage,
        beforeEnter: () => Boolean(profileStore.profile)
    },
    {
        path: '/admin',
        component: AdminPage,
        beforeEnter: (): boolean => profileStore.profile?.role === 'ADMIN',
        children: [
            {
                path: 'users',
                component: AdminUsers
            },
            {
                path: 'courses',
                component: AdminCourses
            }
        ]
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
