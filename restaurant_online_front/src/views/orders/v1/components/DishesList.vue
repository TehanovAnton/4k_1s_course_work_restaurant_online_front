<script setup>
  const props = defineProps(['order'])

  const orderDishCount = (dish) => {
    let dishes = props.order.dishes.filter(d => d.id === dish.id)
    return dishes.length
  }
</script>

<template>
  <ul>
    <li v-for="dish in order.dishes">
      {{ dish.name }} - x{{ orderDishCount(dish) }}
    </li>
  </ul>
</template>