<script setup>
  import { computed, onBeforeMount, ref } from 'vue';
  import FloatLabelInput from '../../components/forms/FloatLabelInput.vue';
  import { ButtonSetting } from '../services/buttons/ButtonSetting';
  import FormSettableButtons from '../../components/forms/FormSettableButtons.vue';
  import { useRestaurantsStore } from '../restaurants/stores/RestaurantsStore';

  const restaurantsStore = useRestaurantsStore()

  onBeforeMount(() => {
    Object.assign(formObject.value, restaurantsStore.company)
  })

  const emits = defineEmits(['formSubmit'])

  const formObject = ref({
    name: '',
    email: ''
  })

  const pageMode = ref('show')

  const setPageMode = (mode) => {
    pageMode.value = mode
  }
  const isMode = (mode) => {
    return mode === pageMode.value
  }
  const isReadOnly = computed(() => {
    return isMode('show')
  }) 

  const primaryButton = computed(() => {
    const button = new ButtonSetting('Edit', true, () => { setPageMode('edit') })

    if (!isReadOnly.value) {
      button.setAttribute('label', 'Update')
      button.setAttribute('callback', updateCompany)
    }

    return button
  })

  const secondaryButton = computed(() => {
    const button = new ButtonSetting('', false, () => {})

    if (!isReadOnly.value) {
      button.setAttribute('label', 'Cancel')
      button.setAttribute('enable', true)
      button.setAttribute('callback', () => {
        setPageMode('show') 
        formObject.value = restaurantsStore.company
      })
    }

    return button
  })

  const updateCompany = async () => {
    console.log(formObject.value)
  }
</script>


<template>
  <FormSettableButtons
   form-label="Company"
   :primary-button="primaryButton" :secondary-button="secondaryButton"
   @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback"
  >
    <div class="col-lg-6">
      {{ restaurantsStore.company }}
      <FloatLabelInput label="Name" label-id="company-name">
        <input
          type="text" id="company-name" class="form-control"
          v-model="formObject.name" v-bind:readonly="isReadOnly" v-bind:disabled="isReadOnly"
        />
      </FloatLabelInput>

      <FloatLabelInput label="Email" label-id="company-email">
        <input
          type="text" id="company-email" class="form-control"
          v-model="formObject.email" v-bind:readonly="isReadOnly" v-bind:disabled="isReadOnly"
        />
      </FloatLabelInput>
    </div>
  </FormSettableButtons>
</template>
