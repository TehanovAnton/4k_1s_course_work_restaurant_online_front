<script setup>
  const props = defineProps(['mode', 'allowed', 'visible'])   
</script>

<template>
  <option v-if="(allowed && visible)">
    {{ mode }}
  </option>
</template>
