import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import AboutView from '../views/AboutView.vue'
import BeginnerView from '../views/BeginnerView.vue'
import ChallangeView from '../views/ChallangeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import TranslateView from '../views/TranslateView.vue'
import MyPageView from '../views/MyPageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/test/:word',
      name: 'test',
      component: TestView,
      props: true,
    },
    {
      path: '/beginner',
      name: 'beginner',
      component: BeginnerView
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: ChallangeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/translate',
      name: 'translate',
      component: TranslateView
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPageView
    }
  ]
})

export default router
