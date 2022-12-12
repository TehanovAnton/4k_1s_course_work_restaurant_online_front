<script setup>
  import service from '../services/orders/order_service'
  import ShowDishView from '../dishes/ShowView.vue'; 
  import EditOrderView from './EditView.vue';
  import { onBeforeMount, ref } from 'vue';
  import { computed } from '@vue/reactivity';
  import Modes from '../../components/Modes.vue';

  import { useRoute } from 'vue-router';
  const route = useRoute()

  onBeforeMount (async () => {
    if (!!!props.order) {
      let {
        response,
        isSuccessful
      } = await service.apiGetOrder(route.params['id'])
      
      dataReady.value = true
      return order.value = response.data
    }

    dataReady.value = true
    order.value = props.order
  })

  const props = defineProps(['order'])
  const order = ref({})
  const dataReady = ref(false)

  const modes = ref(['show', 'edit', 'delete'])
  const currentMode = ref('show')
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:true },
    delete:{ action:'destroy', allowed:false, visible:false } 
  })
  const modesClass = ref('order-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed

  const dishes = computed(() => {
    if (order.value){
      return order.value.orders_dishes.map(od => od.dish)
    }

    return []
  })

  const destroyOrder = async () => {
    // let { 
    //   response, 
    //   isSuccessful
    // } = await service.apiDestroyMenu(tokensService.auth_headers(), order)

    // if (isSuccessful) {      
    //   tokensService.setAuthTokens(response.headers)
    //   emits('data-change')
    // }
  }

  const showDataChange = () => {    
    setMode('show')
    emits('data-change')
  }
</script>

<template>
  <div v-if="dataReady">
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="order"                     :service="service"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        <div class="block centrenize-content-column">
          Dishes:
          
          <div v-for="dish in dishes">
            {{ dish.name }}
          </div>
        </div>

        <button v-if="modeAlowability('delete')"
                type="button"
                @click="destroyOrder">destroy</button>
      </div>
    </div>

    <div v-if="currentMode == 'edit'">
      <EditOrderView :order="order" @data-change="showDataChange" />
    </div>
  </div>
</template>
