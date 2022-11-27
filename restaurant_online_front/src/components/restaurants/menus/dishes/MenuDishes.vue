<script setup>
  const props = defineProps(['dishes'])
</script>

<template>
  <p v-for="dish in dishes" class="menu block">
    {{ dish.name }}
  </p>
</template>
