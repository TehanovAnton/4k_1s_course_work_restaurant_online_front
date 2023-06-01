<script setup>
  import { computed, ref } from 'vue';
  import FloatLabelInput from '../../components/forms/FloatLabelInput.vue';
  import { ButtonSetting } from '../services/buttons/ButtonSetting';
  import FormSettableButtons from '../../components/forms/FormSettableButtons.vue';
  import { useCompanyFormErrorsStore } from './stores/CompanyFormErrorsStore';

  const props = defineProps(['company'])
  const emits = defineEmits(['formSubmit'])

  const formErrorsStore = useCompanyFormErrorsStore()

  const initFormObject = () => {
    let copyCompany = {}
    Object.assign(copyCompany, props.company)

    return copyCompany
  }

  const formObject = ref(initFormObject())

  const primaryButton = computed(() => {
    const button = new ButtonSetting('Create', true, emitSubmit)

    return button
  })

  const secondaryButton = computed(() => {
    return new ButtonSetting('', false, () => {})
  })

  const inlcudeAttribute = (attr) => {
    formObject.value[attr] = props.company[attr]
  }

  const emitSubmit = () => {
    emits('formSubmit', formObject.value)
  }
</script>


<template>
  <FormSettableButtons
   form-label="Company"
   :primary-button="primaryButton" :secondary-button="secondaryButton" :errors-store="formErrorsStore"
   @primaryBtnClick="primaryButton.callback" @secondaryBtnClick="secondaryButton.callback"
  >
    <div class="col-lg-6">
      <FloatLabelInput label="Name" label-id="company-name">
        <input type="text" id="company-name" class="form-control" v-model="company.name" :on-change="inlcudeAttribute('name')" />
      </FloatLabelInput>

      <FloatLabelInput label="Email" label-id="company-email">
        <input type="text" id="company-email" class="form-control" v-model="company.email" :on-change="inlcudeAttribute('email')" />
      </FloatLabelInput>
    </div>
  </FormSettableButtons>
</template>
