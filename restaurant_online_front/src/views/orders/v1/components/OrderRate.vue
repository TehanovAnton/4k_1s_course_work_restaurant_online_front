<script setup>
  import { computed, ref } from 'vue';
  import FloatLabelInput from '../../../../components/forms/FloatLabelInput.vue';
  import FormSettableButtons from '../../../../components/forms/FormSettableButtons.vue';
  import order_service from '../../../services/orders/order_service';
  import { useOrdersStore } from '../../stores/OrdersStore';

  const props = defineProps(['order'])

  const ordersStore = useOrdersStore()

  const orderRate = computed(() => {
    return props.order.rating
  })
  const order = computed(() => {
    return props.order
  })
  const orderState = computed(() => {
    return props.order.order_state
  })

  const evalValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const formRate = ref({
    order_id: order.value.id,
    evaluation: 9,
    text: ''
  })
  const primaryButton = computed(() => {
    if (orderStatus('ready'))
      return {
        enable: true,
        formLabel: '',
        label: 'Finish',
        callBack: async () => await submitFinish()
      }
    else if (orderStatus('finished') && !orderRate.value)
      return {
        enable: true,
        formLabel: 'Rate Order',
        label: 'Submit',
        callBack: async () => await submitRating()
      }
    else
      return {
        enable: true,
        formLabel: 'Rating',
        label: 'Remove',
        callBack: async () => await destroyRating()
      }
  })

  const secondaryButton = ref({
    enable: false,
    label: 'Destroy',
    callBack: async () => await deleteOrder()
  })

  const submitFinish = async () => {
    let {
      isSuccessful
    } = await order_service.apiUpdateOrderState(orderState.value.id, { transition: 'transition_finished' })
    
    if (isSuccessful) {
      ordersStore.updateOrders()
    }
  }

  const submitRating = async () => {
    let {
      isSuccessful
    } = await order_service.apiCreateRating(order.value.id, formRate.value)
    
    if (isSuccessful) {
      ordersStore.updateOrders()
    }
  }

  const destroyRating = async () => {
    debugger
    let {
      isSuccessful
    } = await order_service.apiDestroyRating(orderRate.value)
    
    if (isSuccessful) {
      ordersStore.updateOrders()
    }
  }

  const orderStatus = (status) => {
    return orderState.value.aasm_state === status
  }
</script>

<template>
  <FormSettableButtons v-if="orderStatus('ready')"
    :form-label="primaryButton.formLabel" :primary-button="primaryButton" :secondary-button="secondaryButton"
    @primaryBtnClick="primaryButton.callBack"
  >
  </FormSettableButtons>

  <FormSettableButtons v-if="orderStatus('finished') && !!!orderRate"
    form-label="Rating" :primary-button="primaryButton" :secondary-button="secondaryButton"
    @primaryBtnClick="primaryButton.callBack"
  >
    <div class="col-lg-6">
      <select v-model="formRate.evaluation" class="form-select form-select-lg mb-3" aria-label="Default select example">
        <option v-for="evalValue in evalValues" v-bind:value="evalValue">
          {{ evalValue }}
        </option>
      </select>

      <FloatLabelInput label-id="order-rate-comment" label="Comment">
        <textarea v-model="formRate.text" id="order-rate-comment" class="form-control"></textarea>
      </FloatLabelInput>
    </div>
  </FormSettableButtons>

  <FormSettableButtons v-if="orderStatus('finished') && !!orderRate"
    form-label="Rating" :primary-button="primaryButton" :secondary-button="secondaryButton"
    @primaryBtnClick="primaryButton.callBack"
  >
    <div class="col-lg-6">
      <select v-model="formRate.evaluation" class="form-select form-select-lg mb-3" aria-label="Default select example" disabled>
        <option v-for="evalValue in evalValues" v-bind:value="evalValue">
          {{ evalValue }}
        </option>
      </select>

      <FloatLabelInput label-id="order-rate-comment" label="Comment">
        <textarea v-model="formRate.text" id="order-rate-comment" class="form-control" disabled></textarea>
      </FloatLabelInput>
    </div>
  </FormSettableButtons>
</template>