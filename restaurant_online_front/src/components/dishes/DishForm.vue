<script setup>
  import { ref } from 'vue';
  // const props = defineProps(['dish', 'actionName'])
  const emits = defineEmits(['formSubmit'])

  const dish = ref({ name: '' })
  const actionName = ref("update")
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