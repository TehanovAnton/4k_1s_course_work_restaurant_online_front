<script setup>
import { useContentsStore } from '../../stores/ContentsStore';
import EditIconWrap from './../components/EditIconWrap.vue';

const contentsStore = useContentsStore()
const restaurantEdit = () => {
  // debugger
  contentsStore.currentContent = 'EditView'
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
  .dish {
    background-color: darkgray;
    border-radius: 15px;
    padding: 15px;
    box-shadow: inset 0 0 5px 2px black;
    margin: 5px 0px 0 0px;
  }
</style>