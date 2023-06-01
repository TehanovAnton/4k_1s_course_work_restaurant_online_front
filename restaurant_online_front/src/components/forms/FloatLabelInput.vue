<script setup>
  const props = defineProps(['labelId', 'label'])
</script>

<template>
  <div class="form-floating mb-3">
    <slot />
    <label :for="labelId">{{ label }}</label>
  </div>
</template>