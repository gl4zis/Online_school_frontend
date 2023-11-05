import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../components/LoginForm.vue'
import Home from '../components/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
  }
]

export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
