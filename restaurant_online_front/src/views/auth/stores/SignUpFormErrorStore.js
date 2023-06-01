import { defineStore } from "pinia"
import { computed, ref } from "vue"

export const useSignUpFormErrorStore = defineStore('signUpFormErrorStore', () => {  
  const formErrors = ref([])

  const setErrors = (responseErrors) => {
    Object.keys(responseErrors).forEach((attribute) => {
      let attributeErrosMessages = responseErrors[attribute]  
      formErrors.value.push(attributeErrosMessages[0])
    })
  }

  const clearErrors = () => {
    formErrors.value = []
  }

  const errorsPresent = computed(() => formErrors.value.length > 0)
  const errors = computed(() => formErrors)

  return { 
    errors,
    setErrors,
    clearErrors,
    errorsPresent
  }
})