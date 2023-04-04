<script setup>
  import { useMenusStore } from '../../../views/menus/stores/MenusStore';
  import { useContentsStore } from '../../../views/restaurants/stores/ContentsStore';
  import CurrentRestaurant from '../../../views/restaurants/v1/CurrentRestaurant.vue';

  const menusStore = useMenusStore()
  const contentsStore = useContentsStore()

  const indexDishes = (menu) => {
    menusStore.setMenu(menu)
    contentsStore.setContent('RestaurantShowView')
  }
</script>

<template>
  <CurrentRestaurant />
  <div class="menus-container">
    <div class="menu"
         v-for="menu in menusStore.menus"
         @click="indexDishes(menu)">
      <h1>{{ menu.name }}</h1>
    </div>
  </div>
</template>

<style lang="scss">
  .menus-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .menu {
      width: 70%;
      display: flex;
      justify-content: space-evenly;
      background-color: #b38c8c;
      margin: 5px;
      height: 100px;
      align-items: center;
      border-radius: 15px;
    }
  }
</style>
