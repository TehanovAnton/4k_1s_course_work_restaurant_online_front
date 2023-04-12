<script setup>
  import { ref, computed } from 'vue';
  const props = defineProps(['initValue', 'attribute'])
  const emits = defineEmits(['placeTypeChange'])  

  const initValue = computed(() => props.initValue === 'inside')
  const checkbox = ref(initValue.value)
  const placeType = ref({ type: 'outside' })

  const setPlaceType  = () => {
    placeType.value.type = checkbox.value ? 'inside' : 'outside'
    emits('placeTypeChange', props.attribute, 'type', placeType.value)
  }
</script>

<template>
  <div class="placeType-input-container">
    <label for="placeType-input">Place</label>
    <input id="placeType-input" type="checkbox" v-model="checkbox" @change="setPlaceType" />
  </div>
</template>

<style lang="scss">
  .placeType-input-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
