<script setup>
  const props = defineProps(['menu', 'actionName'])
  const emits = defineEmits(['formSubmit'])
</script>

<template>
  <form class="block">
    <div class="centrenize-content-column">
      <label for="m-name">Name: </label>
      <input id='m-name' v-model="menu.name"/>
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>