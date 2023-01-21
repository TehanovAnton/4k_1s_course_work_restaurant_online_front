<script setup>
  import {  RouterView } from 'vue-router'  
  import { computed } from 'vue'
  import Header from './components/Header.vue';
  import router from './router/router';


  const isNotAuthPage = computed(() => {
    const currentRoute = router.currentRoute.value
    const authRoutes = ['sign_in', 'sign_up']


    if (currentRoute.name && !authRoutes.includes(currentRoute.name))
      return true

    return false
  })
</script>

<template>
  <!-- <Header v-if="isNotAuthPage" /> -->
  <RouterView />
</template>
