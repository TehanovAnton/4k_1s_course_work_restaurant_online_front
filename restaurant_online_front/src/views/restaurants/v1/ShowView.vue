<script setup>
  import { reactive, computed } from 'vue';
  import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue'
  import DishesIndexView from '../../dishes/v1/IndexView.vue';
  import CurrentMenu from '../../menus/v1/components/CurrentMenu.vue';
  import { useRestaurantsStore } from '../stores/RestaurantsStore';
  import { useMenusStore } from '../../menus/stores/MenusStore';
  import { useDishesStore } from '../../dishes/stores/DishesStore';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';

  const restaurantStore = useRestaurantsStore();
  const restaurant = computed(() => { return restaurantStore.currentRestaurant })

  const menusStore = useMenusStore();  
</script>

<template>
  <LoadRestaurants>
    <div class="container">
      <div class="menu-container">
        <div class="card border">
          <div class="card-body">
            <h1 class="card-title">{{ restaurant.name }}</h1>
            <p class="card-text">{{ restaurant.address }}</p>
            <p class="card-text">{{ restaurant.workingTime }}</p>
          </div>
        </div>

        <!-- <CurrentMenu /> -->
      </div>

      <DishesIndexView />
    </div>
  </LoadRestaurants>
</template>

<style lang="scss">
  .menu-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .border {
    border: none;
    border-right: 1px solid #ddd;
    border-radius: 0;
  }

  .sub-card {
    margin-top: 1rem;
  }

  .card {
    margin: 0;
  }
</style>
