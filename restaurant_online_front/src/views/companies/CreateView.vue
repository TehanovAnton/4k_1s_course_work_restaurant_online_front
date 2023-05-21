<script setup>
  import { ref } from 'vue';
  import CompanyForm from './CompanyForm.vue';
  import tokensService from '../services/tokensService';
  import { useCurrentUserStore } from '../../stores/users/currentUser';
  import { BaseApi } from '../services/api/baseApi';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';
  import { useContentsStore } from '../restaurants/stores/ContentsStore';
  import { useCompanyFormErrorsStore } from './stores/CompanyFormErrorsStore'

  const currentUserStore = useCurrentUserStore()
  const restaurantsStore = useRestaurantsStore()
  const contentsSotre = useContentsStore()
  const formErrorsStore = useCompanyFormErrorsStore()
  
  const company = ref({
    name: '',
    email: '',
    super_admins_company_attributes: { user_id: currentUserStore.user.id }
  })

  const createCompany = async (formCompany) => {
    let args = {
      url: 'http://localhost:3000/companies',
      data: { company: formCompany },
      requestOptions: {
        headers: tokensService.auth_headers()
      }      
    }

    const requester = new BaseApi(args)
    await requester.requestBase(
      'post',
      formErrorsStore,
      async (response) => {        
        restaurantsStore.updateAndSetCurrent(restaurantsStore.currentRestaurant)
        await currentUserStore.updateUser()
        contentsSotre.setContent('CompanyShowView')
      }
    )
  }

</script>

<template>
  <CompanyForm 
    :company="company" @form-submit="createCompany"
  />
</template>
