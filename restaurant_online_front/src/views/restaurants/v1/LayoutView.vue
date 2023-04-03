<script setup>
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';
import { useContentsStore } from '../stores/ContentsStore';

import RestaurantIndexView from './../v1/IndexView.vue';
import RestaurantEditView from '../v1/EditView.vue'
import MenuEditView from  '../../menus/EditView.vue'
import DishEditView from '../../dishes/EditView.vue'

const contentsStore = useContentsStore()
const contents = {
  RestaurantIndexView,
  RestaurantEditView,
  MenuEditView,
  DishEditView
}
</script>

<template>
  <HeaderView />
  
  <div class="overview-container">
    <div class="oc-width">
      <component :is="contents[contentsStore.currentContent]" />
    </div>
  </div>

  <FooterView />
</template>

<style>
  .overview-container {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }

  .oc-width {
    width: 80%;    
  }

  .o-height {
    height: 300px;
  }

  .overviews {    
    align-items: center;

    background-color: #c5bfbf;
    display: flex;
    justify-content: space-evenly;
  }

  .secondary-model-container {
    display: flex;
    flex: 1;
    justify-content: space-around;

    height: 100%;
  }
</style>
