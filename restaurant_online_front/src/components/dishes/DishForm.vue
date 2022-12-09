<script setup>
  const props = defineProps(['dish', 'actionName'])
  const emits = defineEmits(['formSubmit'])
</script>

<template>
  <form>
    <div class="centrenize-content-column">
      <label for="d-name">Name: </label>
      <input id='d-name' v-model="dish.name"/>
    </div>

    <button type="button" @click="$emit('formSubmit')">{{ actionName }}</button>
  </form>
</template>