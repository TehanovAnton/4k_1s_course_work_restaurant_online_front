<script setup>
import { useContentsStore } from '../../restaurants/stores/ContentsStore';
import EditIconWrap from '../../restaurants/v1/components/EditIconWrap.vue';

const contentsStore = useContentsStore()
const restaurantEdit = () => {
  contentsStore.currentContent = 'RestaurantEditView'
}
</script>

<template>
  <div class="overviews o-height">
    <EditIconWrap @edit-click="restaurantEdit">
      Restaurant
    </EditIconWrap>

    <div v-if="true" class="secondary-model-container">
      <EditIconWrap>
        Menu
      </EditIconWrap>
    </div>
  </div>
  <div class="models-content-container">
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
    <div class="dish">Dish</div>
  </div>  
</template>

<style>
  .models-content-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .dish {
    background-color: darkgray;
    border-radius: 15px;
    padding: 15px;
    box-shadow: inset 0 0 5px 2px black;
    margin: 5px 0px 0 0px;
  }
</style>