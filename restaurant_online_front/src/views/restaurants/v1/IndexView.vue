<script setup>
import { ref, computed } from 'vue';
import { useContentsStore } from '../../restaurants/stores/ContentsStore';
import { useRestaurantsStore } from '../stores/RestaurantsStore';
import EditIconWrap from '../../restaurants/v1/components/EditIconWrap.vue';
import DishIdexView from '../../dishes/v1/IndexView.vue'
import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue';

const contentsStore = useContentsStore()
const restaurantsStore = useRestaurantsStore()

const editRestaurant = () => {
  contentsStore.setContent('RestaurantEditView')
}

const currentRestaurant = computed(() => restaurantsStore.currentRestaurant )
</script>

<template>
  <LoadRestaurants>
    <div class="overviews o-height">
      <EditIconWrap @edit-click="editRestaurant">
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