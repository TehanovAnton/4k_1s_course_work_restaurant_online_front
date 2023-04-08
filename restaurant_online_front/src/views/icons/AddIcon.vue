<script setup>
  const emits = defineEmits(['icon-click'])
</script>

<template>
  <img src="../../../../public/addIcon.png" alt="add-icon" height="15" width="15"
       @click="$emit('icon-click')">
</template>