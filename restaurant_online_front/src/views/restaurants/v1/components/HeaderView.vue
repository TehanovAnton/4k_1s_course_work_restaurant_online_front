<script setup>
  import { useContentsStore } from '../../stores/ContentsStore';

  const contentsStore = useContentsStore()

  const createWelcome = () => {
    contentsStore.setContent('CreateWelcomeView')
  }

  const basketShowView = () => {
    contentsStore.setContent('BasketShowView')
  }

  const setContentView = (content) => {
    contentsStore.setContent(content)
  }
</script>

<template>
  <div class="r-header" :on-click="createWelcome">
    <p class="h-element">Search</p>
    <button @click="setContentView('UserShowView')">Profile</button>
    <button @click="setContentView('RestaurantsIndexView')">Restaurants</button>
    <button @click="setContentView('OrdersIndexView')">Orders</button>
    <button @click="setContentView('CooksOrdersView')">Cooks Orders</button>
    <button @click="setContentView('BasketShowView')">Basket</button>
    <button @click="createWelcome">Create</button>
  </div>
</template>

<style>
  .r-header {
    display: flex;
    justify-content: space-around;
    
    background-color: black;
  }

  .h-element {
    background-color: white;
    padding: 5px;
    border-radius: 6px;
  }
</style>