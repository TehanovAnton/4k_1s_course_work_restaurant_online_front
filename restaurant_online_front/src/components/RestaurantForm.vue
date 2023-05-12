<script setup>
  import { ref } from 'vue';
  import DefaultForm from './forms/DefaultForm.vue';
  import FloatLabelInput from './forms/FloatLabelInput.vue';

  const props = defineProps(['restaurant', 'actionName', 'label'])
  const emits = defineEmits(['formSubmit', 'cancel'])
  const modefiedRestaurant = ref({ 
    id: props.restaurant.id,
    updateAttributes: {
      companies_restaurant_attributes: props.restaurant.companies_restaurant_attributes
    }
  })

  const inlcudeAttribute = (attr) => {
    modefiedRestaurant.value.updateAttributes[attr] = props.restaurant[attr]
  }
</script>

<template>
  <DefaultForm
    :form-label="label" :primary-button="actionName" secondary-button="Cancel"
    @primaryBtnClick="$emit('formSubmit', modefiedRestaurant)" @secondaryBtnClick="$emit('cancel')"
  >
    <div class="col-lg-6">
      <FloatLabelInput label-id="restaurant-name" label="Name">
        <input type="text" class="form-control" id="restaurant-name" v-model="restaurant.name" @change="inlcudeAttribute('name')" />
      </FloatLabelInput>

      <FloatLabelInput label-id="restaurant-email" label="Email">
        <input type="text" class="form-control" id="restaurant-email" v-model="restaurant.email" @change="inlcudeAttribute('email')" />
      </FloatLabelInput>

      <FloatLabelInput label-id="restaurant-adrress" label="Adrress">
        <input type="text" class="form-control" id="restaurant-adrress" v-model="restaurant.address" @change="inlcudeAttribute('address')" />
      </FloatLabelInput>
    </div>
  </DefaultForm>
</template>
