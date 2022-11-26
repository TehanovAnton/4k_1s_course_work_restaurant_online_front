<script setup>
  const props = defineProps([
    'restaurants',
    'activeRestaurant'
  ])

  const restaurantClass = (restaurant) => {    
    if (restaurant.id === props.activeRestaurant.value.id) {
      return 'active-block'
    }

    return 'block'
  }
</script>

<template>
  <div v-for="restaurant in restaurants"
    v-bind:class="restaurantClass(restaurant)"
    @click="activeRestaurant.setActiveRestaurant(restaurant)"
  >
    {{ restaurant.name }}
  </div>
</template>

<!-- <style>
  .active-block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
    background-color: black;
    color: white;
  }


  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }
</style> -->
