import { defineStore } from "pinia"
import { computed, ref } from "vue"
import _ from "underscore"
import { FormErrorsStoreHelper } from '../views/services/FormErrorsStoreHelper'

export const useFormErrorsStore = defineStore('formErrorsStore', () => {  
  const formErrors = ref([])
  const shownErrorsBuff = ref([])
  const errors = computed(() => formErrors.value)

  const errorsStoreHelper = new FormErrorsStoreHelper()

  const setErrors = (responseErrors) => {    
    formErrors.value = _.difference(formErrors.value,     shownErrorsBuff.value)
    errorsStoreHelper.setErrors(responseErrors, formErrors)
  }

  const clearErrors = () => {
    errorsStoreHelper.clearErrors(formErrors)
  }

  const errorsPresent = computed(() => errorsStoreHelper.errorsPresent(formErrors))

  const shiftError = (error) => {
    shownErrorsBuff.value.push(error)

    return error
  }

  return { 
    errors,
    errorsPresent,
    shiftError,
    setErrors,
    clearErrors    
  }
})