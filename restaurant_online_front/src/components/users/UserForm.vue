<script setup>
  const props = defineProps(['user', 'actionName'])
  const emits = defineEmits(['formSubmit'])
</script>

<template>
  <form class="block">
    <div class="centrenize-content-column">
      <label for="u-name">Name: </label>
      <input id='u-name' v-model="user.name"/>

      <label for="u-email">Email: </label>
      <input id='u-email' v-model="user.email"/>
      
      <div v-if="actionName == 'create'">
        <label for="u-password">Password: </label>
        <input id='u-password' v-model="(user.password)"/>

        <label for="u-password-confirmation">Password confirmation: </label>
        <input id='u-email' v-model="(user.password_confirmation)"/>

        <label for="u-type">Type: </label>
        <input id='u-type' v-model="user.type"/>
      </div>
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>