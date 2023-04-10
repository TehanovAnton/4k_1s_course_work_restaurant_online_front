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
    <p class="h-element">Restaourants</p>
    <p class="h-element">Profile</p>
    <p class="h-element">Search</p>
    <button @click="setContentView('OrderIndexView')">Orders</button>
    <button @click="createWelcome">Create</button>
    <button @click="basketShowView">Basket</button>
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