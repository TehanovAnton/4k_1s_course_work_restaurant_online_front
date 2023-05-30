<script setup>
  import { computed, ref } from 'vue';
  import EditIcon from '../../../icons/EditIcon.vue';
  import DeleteIcon from '../../../icons/DeleteIcon.vue';
  import AddToBasketIcon from '../../../icons/AddIcon.vue';
  import RemoveFromBasketIcon from '../../../icons/RemoveIcon.vue';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../baskets/stores/BasketsStore';
  import dishApi from '../../../services/api/model_api';
  import tokensService from '../../../services/tokensService';
  import { useMenusStore } from '../../../menus/stores/MenusStore';
  import { useCurrentUserStore } from '../../../../stores/users/currentUser';

  const props = defineProps(['dish', 'editable'])

  const currentUserStore = useCurrentUserStore()
  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()
  const dish = computed(() => {
    return props.dish
  })
  const menusStore = useMenusStore()

  const incBasketDishCount = (dish) => {
    basketsStore.incBasketDishCount(dish)
  }

  const decrementBasketDishCount = (dish) => {
    basketsStore.decrementBasketDishCount(dish)
  }  
</script>

<template>
  <div class="dish-card">
    <div class="card">
      <img class="card-img-top" alt="..." v-bind:src="dish.image">

      <div class="card-body">
        <div class="d-flex justify-content-around">
          <h5 class="card-title">{{ dish.name }}</h5>
          <h6 class="card-subtitle m-3 text-muted">{{ dish.price_cents }}$</h6>
        </div>

        <p class="card-text text-muted">
          {{ dish.description }}
        </p>

        <div v-if="editable" class="input-group d-flex d-flex justify-content-center">
          <button @click="incBasketDishCount(dish)" class="btn btn-outline-success btn-md" type="button">+</button>
          <button class="btn btn-outline-secondary btn-md" type="button">{{ basketsStore.basketDishCount(dish) }}</button>
          <button @click="decrementBasketDishCount(dish)" class="btn btn-outline-danger btn-md" type="button">-</button>
        </div>
      </div>
    </div>
  </div>
</template>
