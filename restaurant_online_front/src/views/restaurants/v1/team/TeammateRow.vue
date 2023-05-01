<script setup>
  import { computed } from 'vue';

  const props = defineProps(['teammate'])
  const emits = defineEmits(['removeCook'])
  const teammate = computed(() => props.teammate)

  const isCook = (user) => {
    return user.type == 'Cook'
  }
</script>

<template>
  <div class="row">
    <div>
      {{ teammate.user.email }},
      {{ teammate.user.name }}
    </div>

    <div>
      {{ teammate.user.type }}
    </div>

    <div v-if="isCook(teammate.user)">
      <button type="button" @click="$emit('removeCook', teammate)">Remove</button>
    </div>
  </div>
</template>
