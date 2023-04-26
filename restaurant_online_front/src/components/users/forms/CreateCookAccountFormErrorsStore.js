import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { FormErrorsStoreHelper } from "../../../views/services/FormErrorsStoreHelper"

export const useCreateCookAccountFormErrorsStore = defineStore('createCookAccountFormErrorsStore', () => {  
  const formErrors = ref([])
  const errors = computed(() => formErrors)

  const errorsStoreHelper = new FormErrorsStoreHelper()

  const setErrors = (responseErrors) => {
    errorsStoreHelper.setErrors(responseErrors, formErrors)
  }

  const clearErrors = () => {
    errorsStoreHelper.clearErrors(formErrors)
  }

  const errorsPresent = computed(() => errorsStoreHelper.errorsPresent(formErrors))

  return { 
    errors,
    errorsPresent,
    setErrors,
    clearErrors    
  }
})