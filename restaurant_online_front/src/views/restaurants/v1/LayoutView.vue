<script setup>
import HeaderView from './components/header/HeaderView.vue';
import FooterView from './components/FooterView.vue';
import { useContentsStore } from '../stores/ContentsStore';

import RestaurantTeamShowView from './team/CommandStructureView.vue'; 
import RestaurantShowView from './ShowView.vue';
import RestaurantEditView from '../v1/EditView.vue'
import RestaurantCreateView from '../../../components/restaurants/v1/CreateView.vue';
import RestaurantsIndexView from './index/IndexView.vue';
import MenuEditView from  '../../menus/EditView.vue'
import DishEditView from '../../dishes/EditView.vue'
import DishCreateView from '../../dishes/CreateView.vue';
import CreateWelcomeView from '../../CreateWelcomeView.vue';
import MenuCreateView from '../../menus/CreateView.vue';
import MenuIndexView from '../../../components/menus/v1/IndexView.vue';
import BasketShowView from '../../dishes/v1/index/BasketIndexView.vue';
import OrderCreateView from '../../orders/v1/CreateView.vue';
import OrderEditView from '../../orders/v1/EditView.vue';
import OrdersIndexView from '../../orders/v1/IndexView.vue';
import UserShowView from '../../users/v1/show/ShowView.vue';
import UserEditView from '../../users/EditView.vue';
import CooksOrdersView from '../../cooks/OrdersView.vue';
import CompanyCreateView from '../../companies/CreateView.vue';
import CompanyShowView from '../../companies/ShowView.vue';


const contentsStore = useContentsStore()
const contents = {
  CompanyCreateView,
  CompanyShowView,
  CooksOrdersView,
  RestaurantTeamShowView,
  RestaurantShowView,
  RestaurantEditView,
  RestaurantCreateView,
  RestaurantsIndexView,
  MenuEditView,
  DishEditView,
  DishCreateView,
  CreateWelcomeView,
  MenuCreateView,
  MenuIndexView,
  BasketShowView,
  OrderCreateView,
  OrdersIndexView,
  OrderEditView,
  UserShowView,
  UserEditView
}
</script>

<template>
  <HeaderView />
  
  <div class="container">
    <component :is="contents[contentsStore.currentContent]" />
  </div>
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
