<script setup>
  import { computed } from 'vue';
  import { useDishesStore } from '../stores/DishesStore';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';
  import DishShowView from './Show/ShowView.vue';
  import DishCreateView from '../CreateView.vue';

  const dishesStore = useDishesStore()
  const basketsStore = useBasketsStore()

  const dishes = computed(() => { return dishesStore.dishes })
  const dishesExists = computed(() => {
    if (!!!dishes.value)
      return false

    return dishes.value.length > 0
  })
</script>

<template>
  <div class="dish-grid" v-if="dishesExists">
    <DishShowView v-for="dish in dishes" :dish="dish" />
  </div>

  <DishCreateView v-if="!dishesExists" />
</template>

<style lang="scss">
  .dish-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

    .dish-card {
    flex-basis: calc(33.33% - 10px);
    margin-bottom: 20px;
      
      .card {
      border: 1px solid #ccc;
      border-radius: 5px;
      overflow: hidden;

        .card-img-top-wrapper {
        height: 150px;
        position: relative;
        }

        .card-img-top {
        width: 100%;
        height: 100%;
        object-fit: cover;
        }

        .card-title {
        font-weight: bold;
        font-size: 20px;
        margin: 10px;
        }

        .card-text {
        padding: 0 10px;
        margin-bottom: 10px;
        color: #666;
        }

        .price {
        font-weight: bold;
        margin: 10px;
        } 
      }
    }
  }
</style>
