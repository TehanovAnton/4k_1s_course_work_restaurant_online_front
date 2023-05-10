<script setup>
  const props = defineProps(['labelId', 'label', 'text', 'readOnly'])
</script>

<template>
  <div class="form-floating mb-3">
    <input
      type="text" class="form-control" :id="labelId"
      v-bind:value="text" v-bind:readonly="readOnly" v-bind:disabled="readOnly"
    />
    <label :for="labelId">{{ label }}</label>
  </div>
</template>