import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from '../views/LoginView.vue'
import SignUp from '../views/SignUpView.vue'
import MainPage from "@/views/MainPage.vue";
import MyCourses from "@/views/MyCourses.vue";
import OurTeachers from "@/views/OurTeachers.vue";
import ContactsPage from "@/views/ContactsPage.vue";
import ProfileView from "@/views/ProfileView.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/sign-up',
        component: SignUp
    },
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/courses',
        component: MyCourses
    },
    {
        path: '/teachers',
        component: OurTeachers
    },
    {
        path: '/contacts',
        component: ContactsPage
    },
    {
        path: '/profile',
        component: ProfileView
    }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
