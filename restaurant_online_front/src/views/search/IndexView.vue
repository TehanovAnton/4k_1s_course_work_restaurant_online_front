<script setup>
  import { computed, onBeforeMount } from 'vue';
  import RestaurantCardView from './RestaurantSearchCardView.vue';
  import DishSearchCard from './DishSearchCard.vue';
  import { useSearchModelsStore } from '../search/stores/SearchModelsStore'


  onBeforeMount(() => {
    modelsSearchStore.search('Rest')
  })

  const modelsSearchStore = useSearchModelsStore()
  const models = computed(() => modelsSearchStore.models);
  const modelsComponent = {
    Restaurant: RestaurantCardView,
    Dish: DishSearchCard
  }
</script>


<template>
  <div>
    <div v-if="!!models" v-for="model in models">
      <component :is="modelsComponent[model.type]" :model="model" />
    </div>
  </div>
</template>