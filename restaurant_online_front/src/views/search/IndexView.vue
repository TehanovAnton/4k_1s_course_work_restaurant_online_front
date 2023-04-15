<script setup>
  import { computed } from 'vue';
  import RestaurantCardView from './RestaurantSearchCardView.vue';
  import DishSearchCard from './DishSearchCard.vue';
  import SearchForm from './SearchForm.vue';
  import { useSearchModelsStore } from '../search/stores/SearchModelsStore'

  const modelsSearchStore = useSearchModelsStore()
  const models = computed(() => modelsSearchStore.models);

  const modelsComponent = {
    Restaurant: RestaurantCardView,
    Dish: DishSearchCard
  }

  const search = async (searchText) => {
    await modelsSearchStore.search(searchText)
  }
</script>


<template>
  <div>
    <div class="search-form">
      <SearchForm @form-submit="search" />
    </div>

    <div v-if="!!models" v-for="model in models">
      <component :is="modelsComponent[model.type]" :model="model" />
    </div>
  </div>
</template>

<style>
  .search-form {
    display: flex;
    margin: 15px;
    justify-content: space-around;
  }
</style>