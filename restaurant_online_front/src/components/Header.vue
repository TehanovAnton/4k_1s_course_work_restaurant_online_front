<script setup>
  import router from '../router/router';
  import authService from '../views/services/auth_service';
  
  const usersIndex = () => router.push({ name:'users' })
  const homeView = () => router.push({ name:'home' })
</script>

<template>
  <header class="block centrenize-content-row">
    <button type="button" @click="homeView">Home</button>
    <button type="button" @click="usersIndex">Profile</button>
    <button type="button" @click="authService.apiSignOut()">Sign out</button>
  </header>
</template>