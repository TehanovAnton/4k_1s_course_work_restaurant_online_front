import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '../views/users/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/restaurants/IndexView.vue')
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
    },
    
    {
      path: '/users',
      name: 'users',  
      component: IndexView
    }
  ]
})

export default router
