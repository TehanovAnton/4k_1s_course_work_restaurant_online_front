<script setup>
  const props = defineProps(['user', 'actionName'])
  const emits = defineEmits(['formSubmit'])
</script>

<template>
  <form class="block">
    <div class="centrenize-content-column">
      <label for="r-name">Name: </label>
      <input id='r-name' v-model="user.name"/>

      <label for="r-email">Email: </label>
      <input id='r-email' v-model="user.email"/>      
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>