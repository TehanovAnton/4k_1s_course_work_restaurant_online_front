<script setup>
  import { computed, ref } from 'vue';
  import EditIcon from '../../../icons/EditIcon.vue';
  import AddToBasketIcon from '../../../icons/AddIcon.vue';
  import RemoveFromBasketIcon from '../../../icons/RemoveIcon.vue';
  import { useContentsStore } from '../../../restaurants/stores/ContentsStore';
  import { useDishesStore } from '../../stores/DishesStore';
  import { useBasketsStore } from '../../../baskets/stores/BasketsStore';

  const props = defineProps(['dish'])

  const contentsStore = useContentsStore()
  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()
  const dish = computed(() => props.dish)

  const selectedDishCount = ref(basketsStore.basketDishCount(dish.value))

  const editDish = () => {
    dishesStore.setDish(dish.value)
    contentsStore.setContent('DishEditView')
  }

  const addDishToBasket = (dish) => {
      basketsStore.incBasketDishCount(dish)
  }

  const removeDishFromBasket = (dish) => {
      basketsStore.decrementBasketDishCount(dish)
  }

  const increment = (dish) => {
    addDishToBasket(dish);
    selectedDishCount.value++
  };

  const decrement = (dish) => {
    removeDishFromBasket(dish);
    selectedDishCount.value--
  }; 

  const selectDishCount = () => {
    basketsStore.removeDish(dish.value)
    let times = selectedDishCount.value

    for(let i = 0; i < times; ++i)
      addDishToBasket(dish.value);
  }
</script>

<template>
  <div class="dish-card">
    <div class="card">
      <div class="card-img-top-container">
        <img src="https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350" class="card-img-top" alt="...">
      </div>

      <div class="card-body">
        <h5 class="card-title">{{ dish.name }}</h5>
        <p class="card-text text-muted">{{ dish.description }}</p>
        <EditIcon @icon-click="editDish" />
        <div class="input-group">
          <div class="input-group-prepend">
            <button class="btn btn-outline-secondary" type="button" @click="decrement(dish)">-</button>
          </div>
          {{ selectedDishCount }}
          <select class="form-select" v-model="selectedDishCount" @change="selectDishCount(dish)">
            <option v-for="i in 11" :value="i-1">{{ i-1 }}</option>
          </select>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click="increment(dish)">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .dish-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

    .dish-card {
    flex-basis: calc(33.33% - 10px);
    margin-bottom: 20px;
      
      .card {
      border: 1px solid #ccc;
      border-radius: 5px;
      overflow: hidden;

        .card-img-top-wrapper {
        height: 150px;
        position: relative;
        }

        .card-img-top {
        width: 100%;
        height: 100%;
        object-fit: cover;
        }

        .card-title {
        font-weight: bold;
        font-size: 20px;
        margin: 10px;
        }

        .card-text {
        padding: 0 10px;
        margin-bottom: 10px;
        color: #666;
        }

        .price {
        font-weight: bold;
        margin: 10px;
        } 
      }
    }
  }
</style>
