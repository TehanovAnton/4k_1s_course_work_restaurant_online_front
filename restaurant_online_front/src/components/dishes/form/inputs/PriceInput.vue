<script setup>
  import { ref } from 'vue';

  const props = defineProps(['initValue'])
  const emits = defineEmits(['priceChange'])

  const price = ref({ price:props.initValue })

  const setPrice = () => {    
    emits('priceChange', 'price_cents', 'price', price.value)
  }
</script>

<template>
  <label for="d-price">Price: </label>
  <input id='d-price' v-model="price.price" @change="setPrice" />
</template>