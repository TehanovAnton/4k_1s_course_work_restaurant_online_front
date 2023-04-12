<script setup>  
  import { ref } from 'vue';  
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useOrdersStore } from './stores/OrdersStore';
  import OrderForm from '../../components/orders/v1/OrderForm.vue';
  import service from '../services/orders/order_service'

  const emits = defineEmits(['data-change'])

  const ordersStore = useOrdersStore()
  const contentsStore = useContentsStore()
  const order = ref(ordersStore.order)

  const updatMenu = async (order) => {
    let { isSuccessful } = await service.apiUpdateOrder(order)

    if (isSuccessful) {
      ordersStore.updateOrders()
      contentsStore.setContent('OrdersIndexView')
    }
  }

  const orderIndex = () => {
    contentsStore.setContent('OrdersIndexView')
  }
</script>

<template>
  <div>
    <OrderForm :p-order="order" action-name="update"
               @form-submit="updatMenu" @cancle="orderIndex" />
  </div>
</template>