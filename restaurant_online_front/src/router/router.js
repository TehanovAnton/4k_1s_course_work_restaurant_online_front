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
      component: () => import('../views/auth/SignUpView.vue'),
      beforeEnter: (to, from) => {
        if (sessionStorage.getItem('current-user') != null) {
          router.back()
        }
      }
    },
    {
      path: '/sign_in',
      name: 'sign_in',
      component: () => import('../views/auth/SignInView.vue'),
      beforeEnter: (to, from) => {
        if (sessionStorage.getItem('current-user') != null) {
          router.back()
        }
      }
    },
    
    {
      path: '/users',
      name: 'users',  
      component: IndexView
    }
  ]
})

router.beforeEach(async (to, from) => {
  let public_pathes = ['sign_in', 'sign_up']
  if (!public_pathes.includes(to.name) && sessionStorage.getItem('current-user') == null) {
    return { name:'sign_in' }
  }
})

export default router
