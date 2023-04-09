<script setup>
  import { useBasketsStore } from './stores/BasketsStore'

  const props = defineProps(['dishes'])

  const basketsStore = useBasketsStore()
</script>

<template>
  <ul>
    <li v-for="dish in dishes">
      {{ dish.name }} - x{{ basketsStore.basketDishCount(dish) }}
    </li>
  </ul>
</template>