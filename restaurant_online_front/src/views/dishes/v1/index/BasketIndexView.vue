<script setup>
  import { computed } from '@vue/reactivity';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../baskets/stores/BasketsStore';
  import { useMenusStore } from '../../../menus/stores/MenusStore'
  import ShowView from '../Show/BasketShowView .vue';
  import CreateView from '../../../orders/v1/CreateView.vue';
  import DishesGrid from '../index/DishesGrid.vue';

  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const menusStore = useMenusStore()
  const basketsStore = useBasketsStore()

  const dishes = computed(() => {
    return basketsStore.dishes
  })
</script>

<template>
  <div class="backet-show-view">
    <div v-if="basketsStore.dishes.length == 0">
      <h1>Basket is empty!</h1>
    </div>

    <DishesGrid>
      <ShowView v-for="dish in dishes" :dish="dish" />
    </DishesGrid>

    <CreateView />
  </div>
</template>
