<script setup>
  import { ref } from 'vue';
  import RestaurantForm from '../../components/restaurants/RestaurantForm.vue';
  
  const newRestaurant = ref({ name:'', email:'', address:''})
</script>

<template>  
  <RestaurantForm :restaurant="newRestaurant" action-name="create" @form-submit="() => {}"/>
</template>