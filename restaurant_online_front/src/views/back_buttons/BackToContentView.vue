<script setup>
  import { useContentsStore } from '../restaurants/stores/ContentsStore';

  const props = defineProps(['content', 'name'])

  const contentsStore = useContentsStore()
  
  const setContent = (content) => {
    contentsStore.setContent(content)
  }
</script>

<template>
  <button type="button" @click="setContent(content)">
    {{ name }}
  </button>
</template>