<script setup>
  import { ref } from 'vue';
  import CompanyForm from './CompanyForm.vue';
  
  const company = ref({
    name: '',
    email: ''
  })

  const createCompany = (formCompany) => {
    let data = { company: formCompany }
    console.log(data)
  }

</script>

<template>
  <CompanyForm 
    :company="company" @form-submit="createCompany"
  />
</template>
