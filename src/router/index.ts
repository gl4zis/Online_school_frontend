import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/LoginForm.vue'
import SignUp from '../components/SignUpForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
