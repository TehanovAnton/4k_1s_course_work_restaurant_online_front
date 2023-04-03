<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRestaurantsStore } from '../../../stores/RestaurantsStore';
import { useMenusStore } from '../../../../menus/stores/MenusStore';

const restaurantsStore = useRestaurantsStore()
const menusStore = useMenusStore()

onBeforeMount(async () => {
  await restaurantsStore.fetchRestaurants((_response) => {
    dataReady.value = true
  })

  if (!!!restaurantsStore.currentRestaurant.id) {
    restaurantsStore.setRestaurant(restaurantsStore.restaurants[0])

    if (!!!menusStore.currentMenu.id){
      if (restaurantsStore.currentRestaurant.menus.length > 0)
        menusStore.setMenu(restaurantsStore.currentRestaurant.menus[0])
    }
  }
    
})

const dataReady = ref(false)
</script>

<template>
  <slot v-if="dataReady" />
</template>