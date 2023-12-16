import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Login from '../views/LoginView.vue'
import SignUp from '../views/SignUpView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/sign-up',
        component: SignUp
    }
]

export default createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
