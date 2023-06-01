<script setup>
  import { computed, ref } from 'vue';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../baskets/stores/BasketsStore';
  import dishApi from '../../../services/api/model_api';
  import tokensService from '../../../services/tokensService';
  import { useMenusStore } from '../../../menus/stores/MenusStore';
  import { useCurrentUserStore } from '../../../../stores/users/currentUser';

  const props = defineProps(['dish'])

  const currentUserStore = useCurrentUserStore()
  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()
  const dish = computed(() => {
    return props.dish
  })
  const menusStore = useMenusStore()

  const editDish = () => {
    dishesStore.setDish(dish.value)
    contentsStore.setContent('DishEditView')
  }

  const deleteDish = async () => {
    let args = {
      deleteUrl: `http://localhost:3000/dishes/${props.dish.id}`,
      requestOptions: { headers: tokensService.auth_headers() },
    }

    let {
      isSuccessful
    } = await dishApi.apiDeletModel(args)

    if (isSuccessful) {
      menusStore.updateAndSetCurrent(menusStore.currentMenu)
      contentsStore.setContent('RestaurantShowView')
    }
  }

  const addDishToBasket = (dish) => {
      basketsStore.incBasketDishCount(dish)
  }

  const removeDishFromBasket = (dish) => {
      basketsStore.decrementBasketDishCount(dish)
  }

  const ownDish = computed(() => {
    return dishesStore.ownDish(dish.value, currentUserStore.user)
  })

  const dishPresentInBasket = computed(() => {
    return basketsStore.basketDishCount(dish.value) !== 0
  })
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

        <div class="input-group d-flex d-flex justify-content-center">
          <button  v-if="ownDish" @click="deleteDish" class="btn btn-outline-danger btn-md" type="button">Destroy</button>
          <button  v-if="ownDish" @click="editDish" class="btn btn-outline-secondary btn-md" type="button" >Edit</button>
          <button v-if="!dishPresentInBasket" @click="addDishToBasket(dish)" class="btn btn-outline-success btn-md" type="button">Add to basket</button>
          <button v-if="dishPresentInBasket" @click="removeDishFromBasket(dish)" class="btn btn-outline-success btn-md" type="button">Remove from basket</button>
        </div>
      </div>
    </div>
  </div>
</template>
