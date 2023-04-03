<script setup>
import { ref } from 'vue';
import { useContentsStore } from '../../restaurants/stores/ContentsStore';
import EditIconWrap from '../../restaurants/v1/components/EditIconWrap.vue';
import DishIdexView from '../../dishes/v1/IndexView.vue'
import LoadRestaurants from './components/datacomponents.vue/LoadRestaurants.vue';

const dataReady = ref(false)
const restaurants = ref([])
const currentRestaurant = ref({})
const contentsStore = useContentsStore()

const setRestaurants = (fetchedRestaurants) => {
  restaurants.value = fetchedRestaurants.value
  debugger
}
</script>

<template>
  <LoadRestaurants @data-ready="setRestaurants">
    <div class="overviews o-height">
      <EditIconWrap @edit-click="contentsStore.setContent('RestaurantEditView')">
        Restaurant
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
  .models-content-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>