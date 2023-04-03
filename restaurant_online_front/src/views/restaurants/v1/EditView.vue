<script setup>
import EditIconWrap from './components/EditIconWrap.vue';
import RestaurantForm from '../../../components/RestaurantForm.vue';
import { useContentsStore } from '../stores/ContentsStore';

const contentsStore = useContentsStore()
const restaurantEdit = () => {
  console.log('2')
}
</script>

<template>
  <div class="overviews o-height">
    <EditIconWrap>
      Restaurant  
    </EditIconWrap>    
  </div>

  <RestaurantForm :restaurant="{ name:'', email: '', address: '' }" :action-name="'Update'" />
</template>s.call

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