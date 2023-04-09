<script setup>
  import { ref, computed } from 'vue';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { useBasketsStore } from '../../../views/baskets/stores/BasketsStore';
  import TimeInput from '../inputs/TimeInput.vue';
  import PlaceTypeInput from '../inputs/PlaceTypeInput.vue'

  const props = defineProps(['order'])
  const emtis = defineEmits(['formSubmit'])

  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()
  const basketsStore = useBasketsStore()

  const initOrder = () => {
    let iOrder = {
      user_id: currentUserStore.user.id,
      attributes: {
        restaurant_id: restaurantsStore.currentRestaurant.id,
        user_id: currentUserStore.user.id,
        orders_dishes_attributes: basketsStore.currentBasket.dishes,
        reservation_attributes: { place_type: 'outside' }
      }
    }

    return iOrder
  }

  const order = ref(initOrder())
  const placeType = computed(() => {
    let reservation = props.order.reservation
    return !!reservation ? reservation.place_type : '' 
  })

  const inlcudeAttribute = (attr, sourceObjectAttr = attr, sourceObject = props.order) => {
    order.value.attributes.reservation_attributes[attr] = sourceObject[sourceObjectAttr]
  }

  const formSubmit = () => {
    emtis('formSubmit', order.value)
  }
</script>

<template>
  <form>
    <TimeInput attribute="start_at" @time-change="inlcudeAttribute" />
    <PlaceTypeInput :init-value="placeType" attribute="place_type"
                    @place-type-change="inlcudeAttribute" />
    <button type="button" @click="formSubmit">Order</button>
  </form>
</template>

