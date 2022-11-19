import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: () => import('../views/auth/SignUpView.vue')
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: () => import('../views/auth/SignInView.vue')
    }
  ]
})

export default router
