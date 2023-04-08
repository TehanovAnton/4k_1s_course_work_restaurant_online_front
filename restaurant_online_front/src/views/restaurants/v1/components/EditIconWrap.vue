<script setup>
import EditIcon from '../../../icons/EditIcon.vue';
const emits = defineEmits(['edit-click'])

</script>

<template>
  <div class="main-model-container">
    <div class="main-model-container-content">
      <slot />
    </div>

    <div class="edit-icon">
      <EditIcon @icon-click="$emit('edit-click')" />
    </div>
  </div>
</template>

<style lang="scss">
  .main-model-container{
    display: flex;
    flex: 2;
    justify-content: space-around;
    height: 100%;

    .main-model-container-content {
      flex: 20;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
    }

    .edit-icon {
      flex: 1;
      display: flex;
      margin: 5px;
      justify-content: space-around;
    }
  }
</style>