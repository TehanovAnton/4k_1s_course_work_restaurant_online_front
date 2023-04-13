<script setup>
  import { useContentsStore } from './restaurants/stores/ContentsStore';

  const contentsStore = useContentsStore()

  const createMenu = () => contentsStore.setContent('MenuCreateView')
  const createDish = () => contentsStore.setContent('DishCreateView')
  const createRestaurant = () => contentsStore.setContent('RestaurantCreateView')
</script>

<template>
  <div class="create-elements-container">
    <div class="create-element" @click="createRestaurant">
      <h1>Restaurant</h1>
    </div>

    <div class="create-element" @click="createMenu">
      <h1>Menu</h1>
    </div>

    <div class="create-element" @click="createDish">
      <h1>Dish</h1>
    </div>
  </div>
</template>

<style lang="scss">
  .create-elements-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .create-element {
      width: 70%;
      display: flex;
      justify-content: space-evenly;
      background-color: #b38c8c;
      margin: 5px;
      height: 100px;
      align-items: center;
    }
  }
</style>
