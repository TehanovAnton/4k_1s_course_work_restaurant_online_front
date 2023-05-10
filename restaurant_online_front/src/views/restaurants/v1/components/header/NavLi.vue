<script setup>
  const props = defineProps(['label'])
  const emits = defineEmits(['navClick'])
</script>

<template>
  <li class="nav-item">
    <a 
      class="nav-link" aria-current="page" href="#"
      @click="$emit('navClick')"
    >
      {{ label }}
    </a>
  </li>
</template>