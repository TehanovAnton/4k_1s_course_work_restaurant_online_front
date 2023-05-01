<script setup>

  // import router from '../../router/router'
  import { computed, ref } from 'vue'
  import ErrorsShift from '../../errors/ErrorsShift.vue';
  import RegularFormStyle from '../../stylecomponents/RegularFormStyle.vue';  
  import { useCurrentUserStore } from '../../../stores/users/currentUser';
  import { useFormErrorsStore } from '../../../stores/FormErrorsStore'
  import { AuthenticationApi } from '../../../views/services/api/authentication/AuthenticationApi'
  import user_service from '../../../views/services/users/user_service';
  import tokensService from '../../../views/services/tokensService';
  import { useRestaurantsStore } from '../../../views/restaurants/stores/RestaurantsStore';
  import { useTeammatesStore } from '../../../views/restaurants/v1/team/stores/teammatesStore';
  import { FormErrorsStoreHelper } from '../../../views/services/FormErrorsStoreHelper';
  
  const formErrorStore = useFormErrorsStore()
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

  const sign_up = async () => {
    await user_service.requestBase(
      {
        url: `http://localhost:3000/users/show_by_email`,
        data: {
          headers: tokensService.auth_headers(),
          params: { email: bindingUser.value.email }
        }
      },
      'get',
      formErrorStore,
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
      url: `http://localhost:3000/restaurants_teams/restaurants/${currentRestaurant.value.id}/create_cook`,
      data: { user: formUser.value },
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    })

    await requester.postCreateUser(
      formErrorStore, 
      async (response) => {
        formErrorStore.setErrors(['User created'])
        await teammatesStore.fetchTeammates()
        formUser.value = {}
      }
    )
  }
</script>

<template>

  <RegularFormStyle>
    <form id="cook-form" class="form">      
      <ErrorsShift :errors-store="formErrorStore" />

      <label for="cook-form">Create Cook</label>

      <div class="form__content">
        <label for="cook-name">Name</label>
        <input id="cook-name" type="text" class="text-input" v-model="formUser.name" />

        <label for="cook-email">Email</label>
        <input id="cook-name" type="text" class="text-input" v-model="formUser.email" />

        <label for="cook-dind-user-email">Bind User Email</label>
        <input id="cook-dind-user-email" type="text" class="text-input" v-model="bindingUser.email" />

        <label for="cook-password">Password</label>
        <input id="cook-password" type="text" class="text-input" v-model="formUser.password" />

        <label for="cook-password-confirmation">Password Confirmation</label>
        <input id="cook-password-confirmation" type="text" class="text-input" v-model="formUser.password_confirmation" />
      </div>
      
      <div class="form__actions">
        <button type="button" @click="sign_up">Create Cook</button>
      </div>
    </form>
  </RegularFormStyle>
</template>
