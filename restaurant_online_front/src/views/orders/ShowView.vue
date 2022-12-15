<script setup>
  import service from '../services/orders/order_service'
  import EditOrderView from './EditView.vue';
  import ShowRatingView from '../ratings/ShowView.vue';
  import { onBeforeMount, ref } from 'vue';
  import { computed } from '@vue/reactivity';
  import Modes from '../../components/Modes.vue';
  import moment from 'moment-timezone'
  import tokensService from '../services/tokensService';

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
  const emits = defineEmits(['data-change'])
  const order = ref({})
  const dataReady = ref(false)

  const modes = ref(['show', 'edit', 'delete'])
  const currentMode = ref('show')
  const modesProperties = ref({
    show:{ action:'show', allowed:true, visible:true },
    edit:{ action:'update', allowed:false, visible:props.order.aasm_state == 'active' },
    delete:{ action:'destroy', allowed:false, visible:false } 
  })
  const modesClass = ref('order-class')
  const setMode = (modeName) => currentMode.value = modeName  
  const modeAlowability = (mode) => modesProperties.value[mode].allowed

  const rating = ref({ id: 2, evaluation: 5, text: 'good job' })

  const dishes = computed(() => {
    if (order.value){      
      return order.value.orders_dishes.map(od => od.dish)
    }

    return []
  })

  const dtFormated = (dt) => {
    let date = new Date(dt)
    return moment(date).tz(moment.tz.guess()).utcOffset(0).format('YYYY-MM-DD HH:mm')
  }

  const destroyOrder = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiDestroyOrder(order.value.id)

    if (isSuccessful) {      
      emits('data-change')
    }
  }

  const cancelOrder = async () => {
    let { 
      response, 
      isSuccessful
    } = await service.apiCancelOrder(order.value.id)

    if (isSuccessful) {      
      emits('data-change')
    }
  }

  const showDataChange = () => {    
    setMode('show')
    emits('data-change')
  }

  const isActive = computed(() => order.value.aasm_state == 'active')
</script>

<template>
  <div v-if="dataReady">
    <Modes :modes="modes"               :modes-properties="modesProperties" :modes-class="modesClass"
           :current-mode="currentMode"  :record="order"                     :service="service"
           @set-mode="setMode"/>

    <div v-if="currentMode == 'show'">
      <div class="centrenize-content-column">
        <div class="block centrenize-content-column">          
          <p class="centrenize-content-column" v-for="reservation in order.reservations">
            <span>{{ order.restaurant.name }}-{{ order.restaurant.address }}-{{ order.aasm_state }}</span>
            
            <div v-if="reservation.place_type == 'inside'" class="centrenize-content-column">
              <span>{{ dtFormated(reservation.start_at) }}-{{ dtFormated(reservation.end_at) }}</span>
              <span v-if="!!reservation.table">table - {{ reservation.table.number }}</span>
            </div>

            <div v-if="!isActive">
              <ShowRatingView :rating="rating" />
            </div>
          </p>
          
          <div v-for="dish in dishes">
            {{ dish.name }}
          </div>
        </div>

        <div class="block centrenize-content-row">
          <button v-if="modeAlowability('delete')"
                  type="button"
                  @click="destroyOrder">
            destroy
          </button>

          <button v-if="modeAlowability('delete') && order.aasm_state == 'active'"
                  type="button"
                  @click="cancelOrder">
            cancel
          </button>          
        </div>
      </div>
    </div>

    <div v-if="currentMode == 'edit' && isActive">
      <EditOrderView :order="order" @data-change="showDataChange" />
    </div>
  </div>
</template>
