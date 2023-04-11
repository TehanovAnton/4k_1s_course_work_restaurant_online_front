<script setup>
  import { onBeforeMount, ref } from 'vue';
  import { useRestaurantsStore } from '../../../stores/RestaurantsStore';
  import { useMenusStore } from '../../../../menus/stores/MenusStore';
  import { useRoute } from 'vue-router';

  const restaurantsStore = useRestaurantsStore()
  const menusStore = useMenusStore()
  const route = useRoute()

  onBeforeMount(async () => {
    await restaurantsStore.fetchRestaurants((_response) => {
      let routeRestaurant = restaurantsStore.restaurants.find(restaurant => restaurant.id.toString() === route.params.id)
      restaurantsStore.setRestaurant(routeRestaurant)

      if (!!!menusStore.currentMenu.id && restaurantsStore.currentRestaurant.menus.length > 0)
          menusStore.setMenu(restaurantsStore.currentRestaurant.menus[0])

      dataReady.value = true
    })      
  })

  const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>