import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'
import ExampleView from '../views/ExampleView.vue'
import ChallangeView from '../views/ChallangeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistView from '../views/RegistView.vue'
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
      path: '/test/:word',
      name: 'test',
      component: TestView,
      props: true,
    },
    {
      path: '/example/:word',
      name: 'example',
      component: ExampleView
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
      path: '/regist',
      name: 'regist',
      component: RegistView
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
