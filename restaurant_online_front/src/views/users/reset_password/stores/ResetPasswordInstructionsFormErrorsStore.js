import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { FormErrorsStoreHelper } from "../../../services/FormErrorsStoreHelper"

export const useResetPasswordInstructionsFormErrorsStore = defineStore('resetPasswordInstructionsFormErrors', () => {  
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