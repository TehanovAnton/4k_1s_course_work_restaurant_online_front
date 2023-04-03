<script setup>
import { ref, computed } from 'vue';
import { useContentsStore } from '../stores/ContentsStore';
import { useRestaurantsStore } from '../stores/RestaurantsStore';
import EditIconWrap from './components/EditIconWrap.vue';
import DishShowView from '../../dishes/v1/ShowView.vue'
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
      <DishShowView />
      <DishShowView />
      <DishShowView />
      <DishShowView />
      <DishShowView />
      <DishShowView />
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