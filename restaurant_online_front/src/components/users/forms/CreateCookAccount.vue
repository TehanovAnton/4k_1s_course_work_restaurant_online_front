<script setup>
  import { computed, ref } from 'vue'
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { AuthenticationApi } from '../../../views/services/api/authentication/AuthenticationApi'
  import user_service from '../../../views/services/users/user_service';
  import tokensService from '../../../views/services/tokensService';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';
  import { useTeammatesStore } from '../../../views/restaurants/v1/team/stores/teammatesStore';
  import { useCreateCookAccountFormErrorsStore } from './CreateCookAccountFormErrorsStore'
  import { FormErrorsStoreHelper } from '../../../views/services/FormErrorsStoreHelper';
  import FormSettableButtons from '../../forms/FormSettableButtons.vue';
  import FloatLabelInput from '../../forms/FloatLabelInput.vue';
  import { ButtonSetting } from '../../../views/services/buttons/ButtonSetting';
  
  const createCookAccountFormErrorsStore = useCreateCookAccountFormErrorsStore()
  const currentUserStore = useCurrentUserStore()
  const restaurantStore = useRestaurantsStore()
  const teammatesStore = useTeammatesStore()
  const currentRestaurant = computed(() => restaurantStore.currentRestaurant)

  const formUser = ref({
    name: 'clone3',
    email: 'clone3@gmail.com',
    password: 'ewqqwe',
    password_confirmation: 'ewqqwe',
    confirm_success_url: '/',
    restaurants_cook_attributes: { restaurant_id: currentRestaurant.id },
    type: 'Cook'
  })

  const cookUserBinding = ref({
    cook_user_binding_attributes: {
      user_id: ''
    }
  })

  const bindingUser = ref({ email: '' })

  const primaryButton = computed(() => {
    const button = new ButtonSetting('Create', true,  async () => await sign_up())

    return button
  })

  const secondaryButton = computed(() => {
    const button = new ButtonSetting('', false, () => {})
    return button
  })

  const sign_up = async () => {
    await user_service.requestBase(
      {
        url: `${import.meta.env.VITE_BACK_HOST}/users/show_by_email`,
        data: {
          headers: tokensService.auth_headers(),
          params: { email: bindingUser.value.email }
        }
      },
      'get',
      createCookAccountFormErrorsStore,
      (response) => {
        bindingUser.value = response.data
      }
    )

    if (!!!bindingUser.value.id)
      return

    cookUserBinding.value.cook_user_binding_attributes.user_id = bindingUser.value.id
    formUser.value.cook_user_binding_attributes = cookUserBinding.value.cook_user_binding_attributes
    formUser.value.restaurants_cook_attributes = { restaurant_id: currentRestaurant.value.id }
    
    const requester = new AuthenticationApi({
      url: `${import.meta.env.VITE_BACK_HOST}/restaurants_teams/restaurants/${currentRestaurant.value.id}/create_cook`,
      data: { user: formUser.value },
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    })

    await requester.postCreateUser(
      createCookAccountFormErrorsStore, 
      async (response) => {
        createCookAccountFormErrorsStore.setErrors(['User created'])
        await teammatesStore.fetchTeammates()
        formUser.value = {}
      }
    )
  }
</script>

<template>
  <FormSettableButtons
    :primary-button="primaryButton" :secondary-button="secondaryButton" :errors-store="createCookAccountFormErrorsStore"
    @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback" 
  >
    <div class="col-lg-6">
      <FloatLabelInput label="Name" label-id="cook-name">
        <input id="cook-name" type="text" class="form-control" v-model="formUser.name" />
      </FloatLabelInput>

      <FloatLabelInput label="Email" label-id="cook-email">
        <input id="cook-email" type="text" class="form-control" v-model="formUser.email" />
      </FloatLabelInput>

      <FloatLabelInput label="Bind User Email" label-id="cook-dind-user-email">
        <input id="cook-dind-user-email" type="text" class="form-control" v-model="bindingUser.email" />
      </FloatLabelInput>

      <FloatLabelInput label="Password" label-id="cook-password">
        <input id="cook-password" type="text" class="form-control" v-model="formUser.password" />
      </FloatLabelInput>

      <FloatLabelInput label="Password Confirmation" label-id="cook-password-confirmation">
        <input id="cook-password" type="text" class="form-control" v-model="formUser.password" />
      </FloatLabelInput>
    </div>
  </FormSettableButtons>
</template>
