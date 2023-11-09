import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/LoginForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
