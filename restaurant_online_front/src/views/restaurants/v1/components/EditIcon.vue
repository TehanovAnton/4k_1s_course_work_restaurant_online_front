<script setup>
const emits = defineEmits(['icon-click'])
</script>

<template>
  <img src="../../../../../public/editIcon.png" alt="edit-icon" height="15" width="15"
        @click="$emit('icon-click')">
</template>