import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LyricView from '../views/LyricView.vue'
import LoginView from '../views/LoginView.vue'
import LyricEditView from '../views/LyricEditView.vue'
import SettingView from '../views/SettingView.vue'
import GuideView from '../views/GuideView.vue'
import NotFound from '../views/NotFound.vue'
import { checkAuth, logout } from '../helper/firebase.helper'

const router = createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 };
  },
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: HomeView
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
    {
      path: '/songs/:id/edit',
      name: 'single-song-edit',
      component: LyricEditView
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuideView
    },
    { path: "/:catchAll(.*)", component: NotFound }
  ]
})

// add route name here to make private page
const privateRoutes = [
  'single-song-edit'
];


router.beforeEach(async (to, from, next) => {
  const checkLogin = await checkAuth();
  if (privateRoutes.includes(to.name)) {
    if (!checkLogin) {
      next('/login');
    }  
  }

  if (to.name === 'login') {
    if (checkLogin) {
      next('/');
    }
  }

  if (to.name === 'logout') {
    logout();
    next('/');
  }
 
  next();
});

export default router
