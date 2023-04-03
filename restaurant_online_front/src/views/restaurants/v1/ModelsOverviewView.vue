<script setup>
import { useContentsStore } from '../stores/ContentsStore';
import { computed } from '@vue/reactivity';

import ModelsContentView from './../v1/components/ModelsContentView.vue';
import EditView from '../v1/EditView.vue'

const contentsStore = useContentsStore()
const contents = {
  ModelsContentView,
  EditView
}
</script>

<template>
  <div class="overview-container">
    <div class="oc-width">
      <component :is="contents[contentsStore.currentContent]" />
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

  .secondary-model-container {
    display: flex;
    flex: 1;
    justify-content: space-around;

    height: 100%;
  }
</style>
