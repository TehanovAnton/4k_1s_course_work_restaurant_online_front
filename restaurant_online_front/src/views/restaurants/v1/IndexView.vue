<script setup>
import { useContentsStore } from '../../restaurants/stores/ContentsStore';
import EditIconWrap from '../../restaurants/v1/components/EditIconWrap.vue';
import DishIdexView from '../../dishes/v1/IndexView.vue'

const contentsStore = useContentsStore()
</script>

<template>
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
</template>

<style>
  .models-content-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>