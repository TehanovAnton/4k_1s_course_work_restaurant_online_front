<script setup>
  import { computed, onBeforeMount, ref } from 'vue';
  import FloatLabelInput from '../../components/forms/FloatLabelInput.vue';
  import { ButtonSetting } from '../services/buttons/ButtonSetting';
  import FormSettableButtons from '../../components/forms/FormSettableButtons.vue';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';
  import { useCurrentUserStore } from '../../stores/users/currentUser';
  import tokensService from '../services/tokensService';
  import { BaseApi } from '../services/api/baseApi';
  import { useCompanyFormErrorsStore } from './stores/CompanyFormErrorsStore';
  import CompanyRestaurants from '../restaurants/v1/index/CompanyRestaurants.vue';

  const restaurantsStore = useRestaurantsStore()
  const currentUserStore = useCurrentUserStore()
  const formErrorsStore = useCompanyFormErrorsStore()

  onBeforeMount(() => {
    Object.assign(formObject.value, currentUserStore.user.company)
  })

  const emits = defineEmits(['formSubmit'])

  const formObject = ref({
    name: '',
    email: ''
  })

  const pageMode = ref('show')

  const setPageMode = (mode) => {
    pageMode.value = mode
  }
  const isMode = (mode) => {
    return mode === pageMode.value
  }
  const isReadOnly = computed(() => {
    return isMode('show')
  }) 

  const primaryButton = computed(() => {
    const button = new ButtonSetting('Edit', true, () => { setPageMode('edit') })

    if (!isReadOnly.value) {
      button.setAttribute('label', 'Update')
      button.setAttribute('callback', updateCompany)
    }

    return button
  })

  const secondaryButton = computed(() => {
    const button = new ButtonSetting('', false, () => {})

    if (!isReadOnly.value) {
      button.setAttribute('label', 'Cancel')
      button.setAttribute('enable', true)
      button.setAttribute('callback', () => {
        setPageMode('show') 
        formObject.value = currentUserStore.user.company
      })
    }

    return button
  })

  const updateCompany = async () => {
    let args = {
      url: `${import.meta.env.VITE_BACK_HOST}/companies/${currentUserStore.user.company.id}`,
      data: { company: formObject.value },
      requestOptions: {
        headers: tokensService.auth_headers()
      }      
    }

    const requester = new BaseApi(args)
    await requester.requestBase(
      'put',
      formErrorsStore,
      async (response) => {        
        restaurantsStore.updateAndSetCurrent(restaurantsStore.currentRestaurant)
        await currentUserStore.updateUser()
        setPageMode('show')
      }
    )
  }
</script>


<template>
  <div class="row bg-light">
    <FormSettableButtons
      form-label="Company"
      :primary-button="primaryButton" :secondary-button="secondaryButton"
      @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback"
    >
      <div class="col-lg-6">
        <FloatLabelInput label="Name" label-id="company-name">
          <input
            type="text" id="company-name" class="form-control"
            v-model="formObject.name" v-bind:readonly="isReadOnly" v-bind:disabled="isReadOnly"
          />
        </FloatLabelInput>

        <FloatLabelInput label="Email" label-id="company-email">
          <input
            type="text" id="company-email" class="form-control"
            v-model="formObject.email" v-bind:readonly="isReadOnly" v-bind:disabled="isReadOnly"
          />
        </FloatLabelInput>
      </div>
    </FormSettableButtons>
  </div>

  <div class="row bg-light">
    <CompanyRestaurants />
  </div>
</template>
