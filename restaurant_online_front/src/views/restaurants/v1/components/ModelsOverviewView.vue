<script setup>
const displaySecondaryModel = true

</script>

<template>
  <div class="overview-container">
    <div class="oc-width">
      <div class="overviews o-height">
        <div class="main-model-container">
          Restaurant
        </div>

        <div v-if="displaySecondaryModel" class="secondary-model-container">
          Menu
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<style>
  .overview-container {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }

  .oc-width {
    width: 80%;    
  }

  .o-height {
    height: 300px;
  }

  .overviews {    
    align-items: center;

    background-color: #c5bfbf;
    display: flex;
    justify-content: space-evenly;
  }

  .main-model-container{
    display: flex;
    flex: 2;
    justify-content: space-around;
  }

  .secondary-model-container {
    display: flex;
    flex: 1;
    justify-content: space-around;
  }
</style>
