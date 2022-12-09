<script setup>
  import authService from '../views/services/auth_service';

</script>

<template>
  <header class="block centrenize-content-row">
    <button type="button" @click="authService.apiSignOut()">sign out</button>
  </header>
</template>