<script setup>
  const props = defineProps(['mode', 'allowed', 'visible'])   
</script>

<template>  
  <option v-if="(allowed && visible)"
          v-bind:value="mode">
    {{ mode }}
  </option>
</template>
