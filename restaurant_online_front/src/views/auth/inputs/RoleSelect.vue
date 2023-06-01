<script setup>
  import { computed, ref } from 'vue';

  const props = defineProps(['initValue', 'roles'])
  const emits = defineEmits(['roleChange'])

  const inputObject = ref(props.initValue)

  const emitRoleChange = () => {
    emits('roleChange', inputObject.value.role)
  }
</script>

<template>
  <select
    class="form-select form-select-lg mb-3" aria-label="Default select example"
    v-model="inputObject" @change="emitRoleChange"
  >
    <option v-for="role in roles" v-bind:value="role">
      {{ role.name }}
    </option>
  </select>
</template>
