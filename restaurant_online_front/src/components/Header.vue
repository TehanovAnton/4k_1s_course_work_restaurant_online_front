<script setup>
  import router from '../router/router';
  import authService from '../views/services/auth_service';
  import { useCurrentUserStore } from '../stores/users/currentUser';
  const currentUser = useCurrentUserStore()
  
  const usersIndex = () => router.push({ name:'users' })
  const homeView = () => router.push({ name:'home' })
  const ordersView = () => {
    let userId = currentUser.user.id
    router.push({ name:'user_orders', params:{ userId: userId } })
  }
</script>

<template>
  <header class="block centrenize-content-row">
    {{ `${currentUser.user.name}-${currentUser.user.email}` }}
    <button type="button" @click="homeView">Home</button>
    <button type="button" @click="ordersView">Orders</button>
    <button type="button" @click="usersIndex">Profile</button>
    <button type="button" @click="authService.apiSignOut()">Sign out</button>
  </header>
</template>