<script setup>
  import { computed } from 'vue';
  import DishSearchCard from '../../../search/DishSearchCard.vue'
  import DishesGrid from '../../../dishes/v1/index/DishesGrid.vue';
  import { useSearchModelsStore } from '../../../search/stores/SearchModelsStore';
  import { useRestaurantsStore } from '../../stores/RestaurantsStore';
  import { useMenusStore } from '../../../menus/stores/MenusStore';
  import { useContentsStore } from '../../stores/ContentsStore';

  const modelsSearchStore = useSearchModelsStore()
  const restaurantsStore = useRestaurantsStore()
  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()

  const dishes = computed(() => {
    return modelsSearchStore.dishes
  })

  const showRestaurant = (dish) => {
    let restaurant = restaurantsStore.findByMenuId(restaurantsStore.restaurants, dish.menu_id)
    restaurantsStore.setModel(restaurant)

    let menu = menusStore.findMenu({ id: dish.menu_id }) 
    menusStore.setMenu(menu)

    contentsStore.setContent('RestaurantShowView')
  }
</script>

<template>
  <DishesGrid>
    <DishSearchCard v-for="dish in dishes"
    :dish="dish" @dish-click="showRestaurant(dish)"
    />
  </DishesGrid>
</template>

