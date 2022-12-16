<script setup>
  const props = defineProps(['rating', 'actionName'])
  const emits = defineEmits(['rating-submit', 'rating-delete-submit'])
</script>

<template>
  <form class="centrenize-content-column">
    <input type="number" v-model="rating.evaluation">
    <input type="text" v-model="rating.text" />

    <button type="button" @click="$emit('rating-submit')">post rating</button>
    <button type="button" @click="$emit('rating-delete-submit')">delete rating</button>
  </form>
</template>