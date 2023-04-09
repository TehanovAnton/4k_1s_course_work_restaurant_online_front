<script setup>
  import DishesList from './components/DishesList.vue';
  const props = defineProps(['order'])
</script>

<template>
  <div class="order-container">
    <DishesList :order="order" />
  </div>
</template>

<style lang="scss">
  .order-container {

  }
</style>
