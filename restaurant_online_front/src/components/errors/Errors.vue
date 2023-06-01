<script setup>
  import { defineProps } from 'vue'

  const props = defineProps(['errorsStore'])
</script>

<template>
  <div class="menu-form-errors" v-if="errorsStore && errorsStore.errorsPresent">
    <div class="alert alert-danger">
      <ul class="mb-0">
        <li v-for="error in errorsStore.errors.value">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 0.25rem;
}
</style>
