<script setup>
  import service from '../services/dishes/dishes_service';
  import EditDish from '../dishes/EditView.vue'
  import CreateDish from '../dishes/CreateView.vue'
  import Modes from '../../components/Modes.vue';
  import { ref } from 'vue';

  const props = defineProps(['dish'])
  const emits = defineEmits(['data-change'])
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
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
    let { 
      response, 
      isSuccessful
    } = await service.apiDeletsDish(props.dish)

    if (isSuccessful) {      
      emits('data-change')      
    }
  }
</script>

<template>
  <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
         :current-mode="currentMode"  :record="dish"                      :service="service"
         @set-mode="setMode"/>

  <div v-if="currentMode == 'show'">
    <div class="centrenize-content-column">
      {{ dish.name }}

    <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyDish">destroy</button>
    </div>
  </div>

  <div v-if="currentMode == 'edit'">
    <EditDish :dish="dish" @data-change="showDataChange" />
  </div>
</template>
