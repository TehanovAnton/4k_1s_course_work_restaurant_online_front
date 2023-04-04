<script setup>
</script>

<template>
  <div class="create-elements-container">
    <div class="create-element">
      <h1>Restaurant</h1>
    </div>

    <div class="create-element">
      <h1>Menu</h1>
    </div>

    <div class="create-element">
      <h1>Dish</h1>
    </div>
  </div>
</template>

<style lang="scss">
  .create-elements-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .create-element {
      width: 70%;
      display: flex;
      justify-content: space-evenly;
      background-color: #b38c8c;
      margin: 5px;
      height: 100px;
      align-items: center;
    }
  }
</style>
