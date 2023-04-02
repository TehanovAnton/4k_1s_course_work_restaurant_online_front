import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: () => import('../views/restaurants/IndexView.vue')
    // },

    {
      path: '/rests/preview',
      name: 'home',
      component: () => import('../components/lists/RestaurantsList.vue')
    },

    {
      path: '/restaurants/:id/index',
      name: 'restaurantIndex',
      component: () => import('../views/restaurants/v1/IndexView.vue')
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
      component: () => import('../views/users/IndexView.vue')
    },

    {
      path: '/restaurants/:id/menus',
      name: 'restaurant_menus',  
      component: () => import('../views/menus/IndexView.vue')
    },

    {
      path: '/menus/:menuId/dishes',
      name: 'menu_dishes',
      component: () => import('../views/dishes/IndexView.vue')
    },

    {
      path: '/users/:userId/orders',
      name: 'user_orders',
      component: () => import('../views/orders/IndexView.vue')
    },

    {
      path: '/orders/:id',
      name: 'order',
      component: () => import('../views/orders/ShowView.vue')
    },

    {
      path: '/rests/preview',
      name: 'order',
      component: () => import('../components/lists/RestaurantsList.vue')
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
