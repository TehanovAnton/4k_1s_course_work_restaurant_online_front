<script setup>
  import { computed } from 'vue';

  const props = defineProps(['dish'])
  const emits = defineEmits(['dishClick'])
  const dish = computed(() => {
    return props.dish
  })
</script>

<template>
  <div class="dish-card" @click="$emit('dishClick')">
    <div class="card">
      <img class="card-img-top" alt="..." v-bind:src="dish.image">

      <div class="card-body">
        <div class="d-flex justify-content-around">
          <h5 class="card-title">{{ dish.name }}</h5>
          <h6 class="card-subtitle m-3 text-muted">{{ dish.price_cents }}$</h6>
        </div>

        <p class="card-text text-muted">
          {{ dish.description }}
        </p>
      </div>
    </div>
  </div>
</template>
