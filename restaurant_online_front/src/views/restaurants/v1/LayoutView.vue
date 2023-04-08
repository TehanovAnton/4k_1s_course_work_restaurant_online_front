<script setup>
import HeaderView from './components/HeaderView.vue';
import FooterView from './components/FooterView.vue';
import { useContentsStore } from '../stores/ContentsStore';

import RestaurantShowView from './ShowView.vue';
import RestaurantEditView from '../v1/EditView.vue'
import MenuEditView from  '../../menus/EditView.vue'
import DishEditView from '../../dishes/EditView.vue'
import DishCreateView from '../../dishes/CreateView.vue';
import CreateWelcomeView from '../../CreateWelcomeView.vue';
import MenuCreateView from '../../menus/CreateView.vue';
import MenuIndexView from '../../../components/menus/v1/IndexView.vue';
import BasketShowView from '../../dishes/v1/Show/BasketShowView.vue';

const contentsStore = useContentsStore()
const contents = {
  RestaurantShowView,
  RestaurantEditView,
  MenuEditView,
  DishEditView,
  DishCreateView,
  CreateWelcomeView,
  MenuCreateView,
  MenuIndexView,
  BasketShowView
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

  .secondary-model-container {
    display: flex;
    flex: 1;
    justify-content: space-around;

    height: 100%;
  }
</style>
