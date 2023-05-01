<script setup>
  const props = defineProps(['errorsStore'])
</script>

<template>
  {{ errorsStore.errors }}
  <div class="menu-form-errors" v-if="errorsStore && errorsStore.errorsPresent">
    <ul>
      <li v-for="error in errorsStore.errors">
        {{ errorsStore.shiftError(error) }}
      </li>
    </ul>
  </div>
</template>
