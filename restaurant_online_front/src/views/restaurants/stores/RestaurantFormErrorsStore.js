import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useRestaurantFormErrorsStore = defineStore('restaurantFormErrorsStore', () => {
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