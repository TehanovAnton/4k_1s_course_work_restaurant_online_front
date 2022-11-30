<script setup>
import RestaurantForm from '../../components/restaurants/RestaurantForm.vue';

  const props = defineProps(['restaurant'])
</script>

<template>  
  <RestaurantForm :restaurant="props.restaurant" action-name="update" @form-submit="() => {}"/>
</template>