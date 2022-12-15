<script setup>
  import { onBeforeMount } from 'vue';

  const props = defineProps(['rating'])
</script>

<template>
  <span>{{ rating.evaluation }}. {{ rating.text }}</span>
</template>
