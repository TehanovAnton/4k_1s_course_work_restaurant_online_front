<script setup>
  import { computed } from 'vue';
  import { useMenusStore } from '../menus/stores/MenusStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';

  const props = defineProps(['model'])
  const restaurantsStore = useRestaurantsStore()
  const contentsStore = useContentsStore()
  const menusStore = useMenusStore()

  const restaurant = computed(() => props.model)

  const showRestaurant = () => {
    restaurantsStore.setModel(props.model)

    if (!!!menusStore.currentMenu.id && restaurantsStore.currentRestaurant.menus.length > 0)
        menusStore.setMenu(restaurantsStore.currentRestaurant.menus[0])
    contentsStore.setContent('RestaurantShowView')
  }
</script>

<template>
  <div class="restaurant-card" @click="showRestaurant">
    <h2>{{ restaurant.name }}</h2>
    <div class="restaurant-info">
      <p><strong>Email:</strong> {{ restaurant.email }}</p>
      <p><strong>Address:</strong> {{ restaurant.address }}</p>
      <p><strong>Phone:</strong> {{ restaurant.phone }}</p>
    </div>
    <div class="menu-list">
      <h3>Menus:</h3>
      <ul>
        <li v-for="menu in restaurant.menus" :key="menu.id">{{ menu.name }}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .restaurant-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #f2f2f2;
    }

    .restaurant-info {
      margin-bottom: 10px;
    }

    .menu-list {
      margin-top: 10px;

      ul {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          margin-bottom: 5px;
        }
      }
    }
  }
</style>
