<script setup>
  const emits = defineEmits(['icon-click'])
</script>

<template>
  <img src="../../../../../public/deleteIcon.png" alt="edit-icon" height="15" width="15"
        @click="$emit('icon-click')">
</template>