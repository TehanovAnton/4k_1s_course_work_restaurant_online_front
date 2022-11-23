<script setup>
  import { computed } from '@vue/reactivity';

  const props = defineProps(['restaurant'])
  const menus = computed(() => {    
    return props.restaurant.menus
  })
</script>

<template>
  <p v-for="menu in menus">
    {{ menu.name }}
  </p>
</template>

<style>
</style>