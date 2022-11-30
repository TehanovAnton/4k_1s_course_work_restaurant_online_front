<script setup>
import { def } from '@vue/shared';

  const props = defineProps([
    'restaurants',
    'activeRestaurant',
  ])

  const emits = defineEmits(['change-active-restaurant'])

  const restaurantClass = (restaurant) => {
    if (restaurant.id === props.activeRestaurant.id) {
      return 'active-block'
    }

    return 'block'
  }
</script>

<template>
  <div v-for="restaurant in restaurants"
    v-bind:class="restaurantClass(restaurant)"
    @click="$emit('change-active-restaurant', restaurant)"
  >
    {{ restaurant.name }}
  </div>
</template>
