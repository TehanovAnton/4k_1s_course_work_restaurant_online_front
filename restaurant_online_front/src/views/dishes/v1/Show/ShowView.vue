<script setup>
  import { computed } from '@vue/reactivity';
  import EditIcon from '../../../icons/EditIcon.vue';
  import AddToBasketIcon from '../../../icons/AddIcon.vue';
  import RemoveFromBasketIcon from '../../../icons/RemoveIcon.vue';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../orders/stores/BasketsStore';

  const props = defineProps(['dish'])

  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()
  const dish = computed(() => props.dish)

  const editDish = () => {
    dishesStore.setDish(dish.value)
    contentsStore.setContent('DishEditView')
  }

  const addDishToBasket = () => {
    basketsStore.addDish(dish.value)
  }

  const removeDishFromBasket = () => {
    basketsStore.removeDish(dish.value)
  } 
</script>

<template>
  <div class="dish">
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

    <div class="dish-edit-icon">
      <EditIcon @icon-click="editDish" />
      <AddToBasketIcon @icon-click="addDishToBasket" />
      <RemoveFromBasketIcon @icon-click="removeDishFromBasket" />
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
