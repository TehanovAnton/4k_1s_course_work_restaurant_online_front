<script setup>
  import { ref } from 'vue';

  const props = defineProps(['labelId', 'label', 'readOnly'])
  const emits = defineEmits(['textChange'])

  const text = ref('')
</script>

<template>
  <div class="form-floating mb-3">
    <input
      type="text" class="form-control"
      :id="labelId"
      v-model="text" v-bind:readonly="readOnly" v-bind:disabled="readOnly"
      @change="$emit('textChange', text)"
    />
    <label :for="labelId">{{ label }}</label>
  </div>
</template>