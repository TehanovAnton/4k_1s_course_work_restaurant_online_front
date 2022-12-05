<script setup>
  import { onBeforeMount, ref } from 'vue';  
  import { useRouter } from 'vue-router';
  import ShowUser from './ShowView.vue'
  import service from '../services/users/user_service'
  import tokensService from '../services/tokensService';
  import Modes from '../../components/Modes.vue';

  import { useCurrentUserStore } from '../../stores/users/currentUser';
  const currentUser = useCurrentUserStore();


  onBeforeMount(async () => {
    await getUsers()
    dataReady.value = true
  })

  // const emits = defineEmits(['restaurantsMode'])

  const users = ref([])
  const activeUser = ref()
  // const router = useRouter()
  const dataReady = ref(false)
  


  const modes = ref(['index', 'create'])
  const modesProperties = ref({
    index:{ action:'index', allowed:false, visible:true },
    create:{ action:'create', allowed:false, visible:true }
  })
  const currentMode = ref('index')
  const modesClass = ref("users-class")
  const setMode = (modeName) => currentMode.value = modeName
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
  const modeVisibility = (mode) => modesProperties.value[mode].visible



  const getUsers = async () => {
    let { response, isSuccessful } = await service.apiIndexUsers(tokensService.auth_headers())

    if (isSuccessful) {      
      users.value = response.data
      activeUser.value = users.value.find(u => {
        return u.name == currentUser.user.name
      })

      tokensService.setAuthTokens(response.headers)
    }
  }

  const refreshData = async () => {
    await getRestaurants()
    setMode('index')
  }
</script>

<template>
  <header class="block centrenize-content-row">
    HEADER
  </header>

  <div v-if="dataReady" class="centrenize-content-row">
    <div class="menu block centrenize-content-column">

      <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
             :current-mode="currentMode"
             @set-mode="setMode"/>

      <!-- For this view it recives user, in separate should fetch by id -->
      <div v-if="currentMode == 'index'" v-for="user in users">
        <ShowUser :user="user" @data-change="refreshData"/>
      </div>

      <div v-if="(currentMode == 'create' && modeAlowability('create'))">
        <!-- <CreateRestaurant @data-change="refreshData" /> -->
        Create
      </div>

    </div>  
    
  </div>

  <footer class="block centrenize-content-row">
    FOOTER
  </footer>
</template>

<style>
  .active-block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
    background-color: black;
    color: white;
  }


  .block {
    border: 3px solid black;
    padding: 3px;
    margin: 3px;
  }

  .centrenize {
    display: flex;        
    justify-content: space-around;    
  }

  .centrenize-content-column {
    display: flex;        
    justify-content: space-around;

    flex-direction: column;    
  }

  .centrenize-content-row {
    display: flex;
    justify-content: space-around;
    
    flex-direction: row;                
  }

  .menu {
    flex: 1;

    margin: 1.5px;
  }

  .content {
    flex: 1;

    margin: 1.5px;
  }

  .raw {
    display: flex;
  }
</style>
