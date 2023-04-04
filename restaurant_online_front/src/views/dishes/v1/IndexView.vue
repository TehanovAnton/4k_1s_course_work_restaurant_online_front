<script setup>
import { useDishesStore } from '../stores/DishesStore';
import ShowView from './ShowView.vue';

const dishesStore = useDishesStore()
</script>

<template>
  <ShowView v-for="dish in dishesStore.dishes"
            :dish="dish"/>
</template>