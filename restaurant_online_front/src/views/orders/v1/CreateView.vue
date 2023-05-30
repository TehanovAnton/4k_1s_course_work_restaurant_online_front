<script setup>
  import { onBeforeMount, ref } from 'vue';
  import OrderForm from '../../../components/orders/v1/OrderForm.vue';
  import order_service from '../../services/orders/order_service';
  import { useBasketsStore } from '../../baskets/stores/BasketsStore';
  import { useContentsStore } from '../../restaurants/stores/ContentsStore';
  import { useOrdersStore } from '../stores/OrdersStore';
  import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { useOrderFormErrorsStore } from '../../../components/orders/v1/stores/OrderFormErrorsStore';

  const basketsStore = useBasketsStore()
  const contentsStore = useContentsStore()
  const ordersStore = useOrdersStore()
  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()
  const orderFormErrosStore = useOrderFormErrorsStore()

  onBeforeMount(() => {
    if (!!basketsStore.currentBasket) {
      order.value = {
        id: '',
        user_id: currentUserStore.user.id,
        restaurant_id: restaurantsStore.currentRestaurant.id,
        dishes: basketsStore.dishes,
        order_dishes_attributes: basketsStore.currentBasket.dishes,
        reservation: { id: '', place_type: 'outside', start_at: '', table_id: '' }
      }
    }    
  })

  const order = ref({})

  const createOrder = async (order) => {
    debugger
    await order_service.apiCreateOrder(
      order,
      orderFormErrosStore,
      (_response) => {
        basketsStore.clearBasket()
        ordersStore.updateOrders()
        contentsStore.setContent('OrdersIndexView')
      }
    )
  }

  const showBasket = () => {
    contentsStore.setContent('RestaurantShowView')
  }

  const restaurantsView = () => {
    contentsStore.setContent('RestaurantsIndexView')
  }

  const currentRestaurantView = () => {
    contentsStore.setContent('RestaurantShowView')
  }
</script>

<template>
  <OrderForm
    v-if="basketsStore.dishes.length != 0"
    :baskets-store="basketsStore"
    action-name="Create" :pOrder="order"
    @form-submit="createOrder" @cancle="showBasket"
  />

  <div v-else class="card">
    <div class="card-body">
      <h5 class="card-title">Basket is empty!</h5>
      <p class="card-text">Go to any restaurant and choose dishes for your order</p>
      <a href="#" class="card-link" @click="restaurantsView">restaurants</a>
      <a href="#" class="card-link" v-if="restaurantsStore.currentRestaurant.id " @click="currentRestaurantView">current restaurants</a>
    </div>
  </div>
</template>