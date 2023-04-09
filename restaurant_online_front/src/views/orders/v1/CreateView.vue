<script setup>
  import DishesList from '../../baskets/DishesList.vue';
  import OrderForm from '../../../components/orders/v1/OrderForm.vue';
  import order_service from '../../services/orders/order_service';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
  import { useOrdersStore } from '../stores/OrdersStore';

  const basketsStore = useBasketsStore()
  const contentsStore = useContentsStore()
  const ordersStore = useOrdersStore()

  const createOrder = async (order) => {
    let { isSuccessful } = await order_service.apiCreateOrder(order)

    if (isSuccessful) {
      basketsStore.clearBasket()
      ordersStore.updateOrders()
      contentsStore.setContent('OrdersIndexView')
    }
  }
</script>

<template>
  <DishesList :dishes="basketsStore.dishes" />
  <OrderForm :order="{}"
             @form-submit="createOrder" />
</template>