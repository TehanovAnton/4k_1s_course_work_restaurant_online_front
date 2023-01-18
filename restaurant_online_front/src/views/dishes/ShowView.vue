<script setup>
  import { ref, computed } from 'vue';
  import service from '../services/dishes/DishesService';
  import dishApi from '../services/api/model_api'
  import EditDish from '../dishes/EditView.vue'
  import Modes from '../../components/Modes.vue';  
  import tokensService from '../services/tokensService';

  const props = defineProps(['dish'])
  const emits = defineEmits(['data-change'])

  const editDishModeArgs = computed(() => {
    return {
      canUpdateUrl: `http://localhost:3000/dishes/${props.dish.id}/can_update`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })

  const destroyDishModeArgs = computed(() => {
    return {
      canDestroyUrl: `http://localhost:3000/dishes/${props.dish.id}/can_destroy`,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }
  })

// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true,
      args: editDishModeArgs
    },
    delete:{ action:'destroy', allowed:false, visible:false,
      args: destroyDishModeArgs
    }
  })
  const currentMode = ref('show')
  const modesClass = ref('dish-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
//
  const showDataChange = () => {    
    setMode('show')
    emits('data-change')
  }

  const destroyDish = async () => {
    let args = {
      deleteUrl: `http://localhost:3000/dishes/${props.dish.id}`,
      requestOptions: { headers: tokensService.auth_headers() },
    }

    let { isSuccessful } = await dishApi.apiDeletModel(args)

    if (isSuccessful) {      
      emits('data-change')      
    }
  }
</script>

<template>
  <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
         :current-mode="currentMode"  :record="dish"                      :service="service"
         @set-mode="setMode"/>

  <div v-if="currentMode == 'show' && modeAlowability('show')">
    <div class="centrenize-content-column">
      {{ dish.name }}

    <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyDish">destroy</button>
    </div>
  </div>

  <div v-if="currentMode == 'edit' && modeAlowability('edit')">
    <EditDish :dish="dish" @data-change="showDataChange" />
  </div>
</template>
