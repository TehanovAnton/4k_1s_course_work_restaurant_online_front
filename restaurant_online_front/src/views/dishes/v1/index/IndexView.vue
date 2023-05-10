<script setup>
  import { computed } from 'vue';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../baskets/stores/BasketsStore';
  import DishShowView from './../Show/ShowView.vue';
  import DishCreateView from '../../CreateView.vue';
  import DishesGrid from './DishesGrid.vue';
  import { useMenusStore } from '../../../menus/stores/MenusStore';
  import { useCurrentUserStore } from '../../../../stores/users/currentUser';

  const currentUserSotre = useCurrentUserStore()
  const menusStore = useMenusStore()
  const dishesStore = useDishesStore()

  const dishes = computed(() => { return dishesStore.dishes })
  const dishesExists = computed(() => {
    if (!!!dishes.value)
      return false

    return dishes.value.length > 0
  })

  const ownMenu = (menu) => {
    return menusStore.ownMenu(menu, currentUserSotre.user)
  }
</script>

<template>
  <DishesGrid v-if="dishesExists">
    <DishShowView v-for="dish in dishes" :dish="dish" />
  </DishesGrid>

  <DishCreateView v-if="ownMenu(menusStore.currentMenu) &&!dishesExists" />
</template>

