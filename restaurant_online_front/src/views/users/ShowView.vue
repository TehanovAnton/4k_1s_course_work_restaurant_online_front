<script setup>
  import Modes from '../../components/Modes.vue';
  import EditUser from './EditView.vue'
  import tokensService from '../services/tokensService';
  import service from '../services/users/user_service'
  import { ref } from 'vue';

  const props = defineProps(['user'])  
  const emits = defineEmits(['data-change'])
// 
  const modes = ref(['show', 'edit', 'delete'])
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
  })
  const currentMode = ref('show')
  const modesClass = ref('user-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
// 
  const showDataChange = () => {    
    setMode('show')
    emits('data-change')
  }

  const destroyUser = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiDestroyUser(tokensService.auth_headers(), props.user)

    if (isSuccessful) {      
      tokensService.setAuthTokens(response.headers)
      emits('data-change')
    }
  }
</script>

<template>
  <div>
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="user"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        Name: {{ user.name }}
        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyUser()">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit'">
      <EditUser :user="user" @data-change="showDataChange" />
    </div>  
  </div>
</template>