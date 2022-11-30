<script setup>
  const props = defineProps(['restaurant'])
</script>

<template>
  Name: {{ restaurant.name }}
</template>