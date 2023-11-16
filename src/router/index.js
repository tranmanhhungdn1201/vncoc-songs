import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: HomeView
    },
    {
      path: '/songs/:id',
      name: 'single-song',
      component: () => import('../views/LyricView.vue')
    }
  ]
})

export default router
