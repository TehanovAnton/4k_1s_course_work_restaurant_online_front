<script setup>
  import { ref } from 'vue';
  import RegularFormStyle from '../../components/stylecomponents/RegularFormStyle.vue';
  
  const emits = defineEmits(['form-submit'])

  const searchText = ref('')
</script>searched_models_hash

<template>
  <RegularFormStyle>
  <form class="form">
      <label for="r-name">Search</label>

      <div class="form__content">
        <input type="text" class="text-input" v-model="searchText" />
      </div>

      <div class="form__actions">
        <button type="button" @click="$emit('form-submit', searchText)">
          Search
        </button>
      </div>
    </form>
  </RegularFormStyle>
</template>