<script setup>
import EditIcon from '../../restaurants/v1/components/EditIcon.vue';
import { useContentsStore } from '../../restaurants/stores/ContentsStore';

const contentsStore = useContentsStore()
</script>

<template>
  <div class="dish">
    <div class="dish-content">
      <p>
        Dish
      </p>

      <p>
        image
      </p>

      <p>
        Cost
      </p>

      <p>
        Descip
      </p>
    </div>

    <div class="dish-edit-icon">
      <EditIcon @icon-click="contentsStore.setContent('DishEditView')" />
    </div>
  </div>
</template>

<style>
.dish {
    display: flex;
    background-color: darkgray;
    border-radius: 15px;
    padding: 15px;
    box-shadow: inset 0 0 5px 2px black;
    margin: 5px 0px 0 0px;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }

  .dish-content {
    flex: 20;
  }

  .dish-edit-icon {
    flex: 1;
    height: 152px;
    display: flex;
    justify-content: flex-end;
  }
</style>
