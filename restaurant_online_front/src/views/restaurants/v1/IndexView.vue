<script setup>
import { ref } from 'vue';
import { useContentsStore } from '../../restaurants/stores/ContentsStore';
import EditIconWrap from '../../restaurants/v1/components/EditIconWrap.vue';
import DishIdexView from '../../dishes/v1/IndexView.vue'
import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue';

const restaurants = ref([])
const currentRestaurant = ref({})
const contentsStore = useContentsStore()

const setConstants = (fetchedRestaurants) => {
  restaurants.value = fetchedRestaurants.value
  currentRestaurant.value = restaurants.value[0]
}
</script>

<template>
  <LoadRestaurants @data-ready="setConstants">
    <div class="overviews o-height">
      <EditIconWrap @edit-click="contentsStore.setContent('RestaurantEditView')">
        <div class="restaurant-info">
          <h1>{{ currentRestaurant.name }}</h1>
          <div class="info-attr">{{ currentRestaurant.email }}</div>
          <div class="info-attr">{{ currentRestaurant.address }}</div>
        </div>
      </EditIconWrap>

      <div v-if="true" class="secondary-model-container">
        <EditIconWrap @edit-click="contentsStore.setContent('MenuEditView')">
          Menu
        </EditIconWrap>
      </div>
    </div>
    <div class="models-content-container">
      <DishIdexView />
      <DishIdexView />
      <DishIdexView />
      <DishIdexView />
      <DishIdexView />
      <DishIdexView />
    </div>  
  </LoadRestaurants>
</template>

<style>
  .restaurant-info {

  }

  .models-content-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>