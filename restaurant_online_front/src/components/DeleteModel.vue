<script setup>
import { computed } from '@vue/reactivity';
import modelApi from '../views/services/api/model_api';
import tokensService from '../views/services/tokensService';

const props = defineProps(['record', 'destroyUrl'])
const emits = defineEmits(['deletedSucessfully'])

const destroyUrl = computed(() => {
  return props.destroyUrl
})

const destroyModel = async () => {
  debugger
  let args = { 
    deleteUrl: destroyUrl.value,
    requestOptions: { 
      headers: tokensService.auth_headers()
    }
  }

  let { response, isSuccessful } = await modelApi.apiDeletModel(args)

  if (isSuccessful) {      
    emits('deletedSucessfully')
  }
}
</script>

<template>
  Destroy {{ record.name }}?
  <button @click="destroyModel">Ok</button>
</template>