import SignInPage from '@/views/auth/SignInPage.vue'
import SignUpPage from '@/views/auth/SignUpPage.vue'
import EditPage from '@/views/EditPage.vue'
import HomePage from '@/views/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditPage
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInPage
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpPage
    }
  ]
})

export default router
