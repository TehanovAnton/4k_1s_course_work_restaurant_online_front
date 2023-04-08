<script setup>
  import { useContentsStore } from '../restaurants/stores/ContentsStore';

  const props = defineProps(['content'])

  const contentsStore = useContentsStore()
  
  const setContent = (content) => {
    contentsStore.setContent(content)
  }
</script>

<template>
  <button type="button" @click="setContent(content)">
    back
  </button>
</template>