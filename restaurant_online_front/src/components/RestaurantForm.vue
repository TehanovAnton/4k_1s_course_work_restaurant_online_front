<script setup>
  const props = defineProps(['restaurant', 'actionName'])
  const emits = defineEmits(['formSubmit'])
</script>

<template>
  <form class="block">
    <div class="centrenize-content-column">
      <label for="r-name">Name: </label>
      <input id='r-name' v-model="restaurant.name"/>

      <label for="r-email">Email: </label>
      <input id='r-email' v-model="restaurant.email"/>
      
      <label for="r-address">Address: </label>
      <input id='r-address' v-model="restaurant.address"/>
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>