<script setup>
  import DishesList from './DishesList.vue';
  import OrderForm from '../../../components/orders/v1/OrderForm.vue';
  import order_service from '../../services/orders/order_service';

  const createOrder = async (order) => {
    debugger
    let { isSuccessful } = await order_service.apiCreateOrder(order)

    if (isSuccessful) {      
      console.log('created')
    }
  }
</script>

<template>
  <DishesList />
  <OrderForm :order="{}"
             @form-submit="createOrder" />
</template>