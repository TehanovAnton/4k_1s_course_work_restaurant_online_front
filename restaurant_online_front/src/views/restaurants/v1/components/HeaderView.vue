<script setup>
  import { useContentsStore } from '../../stores/ContentsStore';

  const contentsStore = useContentsStore()

  const createWelcome = () => {
    contentsStore.setContent('CreateWelcomeView')
  }
</script>

<template>
  <div class="r-header" :on-click="createWelcome">
    <p class="h-element">Restaourants</p>
    <p class="h-element">Profile</p>
    <p class="h-element">Search</p>
    <button @click="createWelcome">Click</button>
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