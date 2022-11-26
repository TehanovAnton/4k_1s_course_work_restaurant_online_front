<script setup>
  import { onBeforeMount } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();

  onBeforeMount(() => {
    debugger
  })
</script>

<template>
  
</template>

<style>
  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .centrenize-content-column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .menu {
    flex: 1;

    margin: 1.5px;
  }
</style>