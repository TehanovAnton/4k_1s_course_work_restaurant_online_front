<script setup>
  import { onBeforeMount, ref } from 'vue';  
  import { useRoute, useRouter } from 'vue-router';
  import ShowOrder from './ShowView.vue'
  import service from '../services/orders/order_service'
  import tokensService from '../services/tokensService';
  import CreateOrder from './CreateOrderView.vue';
  import Modes from '../../components/Modes.vue';
  
  const route = useRoute()

  onBeforeMount(async () => {
    await getOrders()
    dataReady.value = true
  })

  const emits = defineEmits(['ordersMode'])

  const orders = ref([])
  const activeOrder = ref()
  const user = ref({})
  const router = useRouter()
  const dataReady = ref(false)
  


  const modes = ref(['index', 'create'])
  const modesProperties = ref({
    index:{ action:'index', allowed:false, visible:true },
    create:{ action:'create', allowed:false, visible:true }
  })
  const currentMode = ref('index')
  const modesClass = ref("restaurans-class")
  const setMode = (modeName) => currentMode.value = modeName
  const modeAlowability = (mode) => modesProperties.value[mode].allowed
  const modeVisibility = (mode) => modesProperties.value[mode].visible



  const getOrders = async () => {
    const userId = route.params['userId']
    let { response, isSuccessful } = await service.apiIndexOrders(userId)    
    
    if (isSuccessful) {      
      orders.value = response.data
      activeOrder.value = orders.value[0]
      user.value = orders.value[0].user

      tokensService.setAuthTokens(response.headers)
    }
  }

  const refreshData = async () => {
    await getOrders()
    setMode('index')
  }
</script>

<template>
  <div v-if="dataReady" class="centrenize-content-row">
    <div class="menu block centrenize-content-column">
      <div class="centrenize-content-row">
        Orders:
        <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
               :current-mode="currentMode"  :record="user"                          :service="service"
              @set-mode="setMode"/>
      </div>
      home
      <!-- For this view it recives order, in separate should fetch by id -->
      <div v-if="currentMode == 'index'" v-for="order in orders">
        <ShowOrder :order="order" @data-change="refreshData"/>
      </div>

      <div v-if="(currentMode == 'create' && modeAlowability('create'))">
        <CreateOrder @data-change="refreshData" />
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
