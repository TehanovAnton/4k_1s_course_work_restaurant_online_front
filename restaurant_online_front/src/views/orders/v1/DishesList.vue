<script setup>
  import { useBasketsStore } from '../../baskets/stores/BasketsStore'

  const basketsStore = useBasketsStore()
</script>

<template>
  <ul>
    <li v-for="dish in basketsStore.dishes">
      {{ dish.name }} - x{{ basketsStore.basketDishCount(dish) }}
    </li>
  </ul>
</template>