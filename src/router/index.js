import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LyricView from '../views/LyricView.vue'
import LoginView from '../views/LoginView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/songs/:id',
      name: 'single-song',
      component: LyricView
    },
    { path: "/:catchAll(.*)", component: NotFound }
  ]
})

export default router
