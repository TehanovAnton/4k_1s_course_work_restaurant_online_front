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
  <div class="container">
    <div class="col">
      <DishesGrid>
        <ShowView
          v-for="dish in dishes"
          :dish="dish"
          :editable="true"
        />
      </DishesGrid>

      <CreateView />
    </div>
  </div>
</template>
