<script setup>
  import { reactive, computed } from 'vue';
  import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue'
  import { useRestaurantsStore } from '../stores/RestaurantsStore';
  import { useMenusStore } from '../../menus/stores/MenusStore';
  import { useDishesStore } from '../../dishes/stores/DishesStore';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';

  const restaurantStore = useRestaurantsStore();
  const menusStore = useMenusStore();
  const dishesStore = useDishesStore();
  const basketStore = useBasketsStore();

  const restaurant = computed(() => { return restaurantStore.currentRestaurant })
  const menu = computed(() => { return menusStore.currentMenu })
  const dishes = computed(() => { return dishesStore.dishes })

  const addDishToBasket = (dish) => {
      basketStore.incBasketDishCount(dish)
  }

  const removeDishFromBasket = (dish) => {
      basketStore.decrementBasketDishCount(dish)
  }

  const increment = (dish) => {
      addDishToBasket(dish);
      dish.count++;
  };

  const decrement = (dish) => {
      removeDishFromBasket(dish);
      if (dish.count > 0) {
          dish.count--;
      }
  };
</script>


<template>
  <LoadRestaurants>
    <div class="container">
      <h1>{{ restaurant.name }}</h1>
      <div class="dish-grid">
        <div v-for="(dish, index) in dishes" :key="index" class="dish-card">
          <div class="card">
            <div class="card-img-top-container">
              <img src="https://c.ndtvimg.com/2022-06/gp4k2jro_burgers_625x300_20_June_22.jpg?im=FeatureCrop,algorithm=dnn,width=620,height=350" class="card-img-top" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ dish.name }}</h5>
              <p class="card-text text-muted">{{ dish.description }}</p>
              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button" @click="decrement(dish)">-</button>
                </div>
                <select class="form-select" :value="basketStore.basketDishCount(dish)" @change="selectDishCount($event, dish)">
                  <option v-for="i in 11" :value="i-1">{{ i-1 }}</option>
                </select>
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="increment(dish)">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </LoadRestaurants>
</template>

<style scoped>
.dish-grid {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
}

.dish-card {
flex-basis: calc(33.33% - 10px);
margin-bottom: 20px;
}

.card {
border: 1px solid #ccc;
border-radius: 5px;
overflow: hidden;
}

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

</style>