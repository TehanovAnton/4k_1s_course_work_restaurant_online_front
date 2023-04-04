<script setup>
  import { computed } from 'vue';
  import { useContentsStore } from '../stores/ContentsStore';
  import { useRestaurantsStore } from '../stores/RestaurantsStore';
  import EditIconWrap from './components/EditIconWrap.vue';

  const contentsStore = useContentsStore()
  const restaurantsStore = useRestaurantsStore()  
  const currentRestaurant = computed(() => restaurantsStore.currentRestaurant)

  const editRestaurant = () => contentsStore.setContent('RestaurantEditView')  
</script>

<template>
  <div class="overviews o-height">
    <EditIconWrap @edit-click="editRestaurant">
      <div class="restaurant-info">
        <h1>{{ currentRestaurant.name }}</h1>
        <div class="info-attr">{{ currentRestaurant.email }}</div>
        <div class="info-attr">{{ currentRestaurant.address }}</div>
      </div>
    </EditIconWrap>

    <slot />
  </div>
</template>

<style>
  .restaurant-info {

  }
  
  .overviews {    
    align-items: center;

    background-color: #c5bfbf;
    display: flex;
    justify-content: space-evenly;
  }

  .overviews.o-height {
    height: 300px;
  }
</style>
