<script setup>
  const props = defineProps(['label'])
</script>

<template>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{{ label }}</a>
    <ul class="dropdown-menu">
      <slot />
    </ul>
  </li>
</template>
