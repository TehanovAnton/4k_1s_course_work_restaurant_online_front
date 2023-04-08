<script setup>
  import { computed } from '@vue/reactivity';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../orders/stores/BasketsStore';
  import { useMenusStore } from '../../../menus/stores/MenusStore'
  import AddIcon from '../../../icons/AddIcon.vue';
  import RemoveIcon from '../../../icons/RemoveIcon.vue';
  import BackToContent from '../../../back_buttons/BackToContentView.vue';

  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const menusStore = useMenusStore()
  const basketsStore = useBasketsStore()

  const dishes = computed(() => {

  })

  const incBasketDishCount = (dish) => {
    basketsStore.incBasketDishCount(dish)
  }

  const decrementBasketDishCount = (dish) => {
    basketsStore.decrementBasketDishCount(dish)
  } 
</script>

<template>
  <div class="backet-show-view">
    <div class="backet-dishes" v-for="dish in basketsStore.dishes">
      <div class="dish-content">
        <p>
          {{ dish.name }}
        </p>

        <p>
          <img id="output"
              width="200"
              :src="dish.image"/>
        </p>

        <p>
          {{ dish.price_cents }}
        </p>

        <p>
          {{ dish.description }}
        </p>
      </div>

      <div class="basket-dish-count">
        <AddIcon @icon-click="incBasketDishCount(dish)" />
        {{ basketsStore.basketDishCount(dish) }}
        <RemoveIcon @icon-click="decrementBasketDishCount(dish)" />
      </div>
    </div>

    <div>
      <BackToContent :content="'RestaurantShowView'" />
    </div>
  </div>
</template>

<style>
  .dish {
    display: flex;
    background-color: darkgray;
    border-radius: 15px;
    padding: 15px;
    box-shadow: inset 0 0 5px 2px black;
    margin: 5px 0px 0 0px;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }

  .dish-content {
    flex: 20;
  }

  .dish-edit-icon {
    flex: 1;
    height: 152px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
</style>
