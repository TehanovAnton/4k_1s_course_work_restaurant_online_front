<script setup>
  import EditIconWrap from './components/EditIconWrap.vue';
  import DishesIndexView from '../../dishes/v1/IndexView.vue';
  import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue';
  import CurrentRestaurant from './CurrentRestaurant.vue';
  import CurrentMenu from '../../menus/v1/components/CurrentMenu.vue';

</script>

<template>
  <LoadRestaurants>
    <CurrentRestaurant>
      <CurrentMenu />
    </CurrentRestaurant>
    
    <DishesIndexView />
  </LoadRestaurants>
</template>

<style>
  .models-content-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>