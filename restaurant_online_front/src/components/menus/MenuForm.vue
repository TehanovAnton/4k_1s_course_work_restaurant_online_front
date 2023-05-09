<script setup>
  import { ref } from 'vue';
import DefaultForm from '../forms/DefaultForm.vue';
import FloatLabelInput from '../forms/FloatLabelInput.vue';

  const props = defineProps(['menu', 'actionName', 'fromLabel'])
  const emits = defineEmits(['formSubmit', 'cancel'])

  const modefiedMenu = ref({ 
    id: props.menu.id,
    attributes: {
      restaurant_id: props.menu.restaurant_id,
    }
  })

  const inlcudeAttribute = (attr) => {
    modefiedMenu.value.attributes[attr] = props.menu[attr]
  }
</script>

<template>
  <DefaultForm
    :form-label="fromLabel" :primary-button="actionName" secondary-button="Cancel"
    @primaryBtnClick="$emit('formSubmit', modefiedMenu)" @secondaryBtnClick="$emit('cancel')"
  >
    <div class="col-lg-6">
      <FloatLabelInput label-id="menu-name" label="Name">
        <input type="text" id="menu-name" class="form-control" v-model="menu.name" :on-change="inlcudeAttribute('name')" />
      </FloatLabelInput>
    </div>
  </DefaultForm>
</template>
