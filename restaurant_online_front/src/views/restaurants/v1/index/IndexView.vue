<script setup>
  import { computed, ref } from 'vue';
  import { useRestaurantsStore } from '../../stores/RestaurantsStore';
  import LoadRestaurants from '../components/datacomponents.vue/LoadRestaurants.vue';
  import AllRestaurants from './AllRestaurants.vue';
  import FoundedRestaurants from './FoundedRestaurants.vue';
  import FoundedDishes from './FoundedDishes.vue';
  import NavLi from '../components/header/NavLi.vue';
  import { useSearchModelsStore } from '../../../search/stores/SearchModelsStore';

  const restaurantStore = useRestaurantsStore();
  const modelsSearchStore = useSearchModelsStore()
  const currentUserRestaurants = computed(() => restaurantStore.currentUserModels)

  const searchText = ref('')
  const content = ref('AllRestaurants')
  const contents = {
    AllRestaurants,
    FoundedRestaurants,
    FoundedDishes,
  }

  const setContent = (newContent) => {
    content.value = newContent
  }

  const search = async (searchText) => {
    await modelsSearchStore.search(searchText)
  }
</script>


<template>
  <LoadRestaurants> 
    <div class="container rounded bg-light">
      <div class="row m-3 bg-transparent d-flex">
        <ul class="nav nav-pills nav-fill">
          <NavLi label="All" @nav-click="setContent('AllRestaurants')"/>
          <NavLi label="Restaurants" @nav-click="setContent('FoundedRestaurants')" />
          <NavLi label="Dishes" @nav-click="setContent('FoundedDishes')" />

          <li>
            <form class="d-flex">
              <input v-model="searchText" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success" type="button" @click="search(searchText)">Search</button>
            </form>
          </li>
        </ul>
      </div>
    </div>

    <div class="row bg-transparent">
      <component :is="contents[content]" />
    </div>
  </LoadRestaurants>  
</template>