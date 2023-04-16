<script setup>
  import { computed } from 'vue';
  import { useMenusStore } from '../menus/stores/MenusStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';

  const props = defineProps(['model'])
  const restaurantsStore = useRestaurantsStore()
  const contentsStore = useContentsStore()
  const menusStore = useMenusStore()

  const dish = computed(() => props.model)
  const dishMenu = computed(() => dish.value.menu)
  const restaurant = computed(() => dishMenu.value.restaurant)

  const showRestaurant = () => {
    restaurantsStore.setRestaurant(restaurant.value)
    menusStore.setMenu(dishMenu.value)
    contentsStore.setContent('RestaurantShowView')
  }

  const dishMenuClass = (menu) => {
    if (menu.id === dishMenu.value.id)
      return 'highlight-menu'

    return ''
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
        <li v-for="menu in restaurant.menus"
            v-bind:class="dishMenuClass(menu)"
            :key="menu.id">
          {{ menu.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .highlight-menu {
    background-color: gray;
  }

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
