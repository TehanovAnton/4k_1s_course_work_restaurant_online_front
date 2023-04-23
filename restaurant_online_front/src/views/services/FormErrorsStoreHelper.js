export class FormErrorsStoreHelper {
  constructor() {

  }

  setErrors(responseErrors, formErrors) {
    Object.keys(responseErrors).forEach((attribute) => {
      let attributeErrosMessages = responseErrors[attribute]

      if (Array.isArray(attributeErrosMessages))
        formErrors.value.push(attributeErrosMessages[0])
      else
        formErrors.value.push(attributeErrosMessages)
    })
  }

  clearErrors(formErrors) {
    formErrors.value = []
  }

  errorsPresent(formErrors) {
    return formErrors.value.length > 0
  }
}