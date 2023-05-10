<script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import { useMenusStore } from '../../../views/menus/stores/MenusStore';
  import ImageInput from './inputs/ImageInput.vue';
  import NameInput from './inputs/NameInput.vue';
  import PriceInput from './inputs/PriceInput.vue';
  import DescriptionInput from './inputs/DescriptionInput.vue';
  import MenuSelectInput from './inputs/MenuSelectInput.vue';
  import DefaultForm from '../../forms/DefaultForm.vue';
  import { useDishFormErrorsStore } from '../../../views/dishes/stores/dishFormErrorsStore';

  const props = defineProps(['dish', 'actionName']);
  const emits = defineEmits(['formSubmit', 'cancel']);

  const dishFormErrorsStore = useDishFormErrorsStore()
  const menusStore = useMenusStore();
  const modefiedDish = ref({
    id: props.dish.id,
    attributes: {
      menu_id: props.dish.menu_id,
      image_file: null,
      image_url: props.dish.image_url,
      name: props.dish.name,
      price_cents: props.dish.price,
      description: props.dish.description,
    },
  });

  const inlcudeAttribute = (attr, sourceObjectAttr = attr, sourceObject = props.dish) => {
    modefiedDish.value.attributes[attr] = sourceObject[sourceObjectAttr]
  }

  const includeMenuAttribute = (attr, sourceObjectAttr = attr, sourceObject) => {
    menusStore.setMenu(sourceObject)
    inlcudeAttribute(attr, sourceObjectAttr, sourceObject)
  }

  const onFormSubmit = () => {
    emits('formSubmit', modefiedDish.value);
  };

  const onCancel = () => {
    emits('cancel');
  };
</script>

<template>
  <DefaultForm
    form-label="Dish" :primary-button="actionName" secondary-button="Cancel" :errors-store="dishFormErrorsStore"
    @primaryBtnClick="onFormSubmit" @secondaryBtnClick="onCancel"
  >
    <div class="col-lg-6">
      <NameInput :init-value="dish.name" @name-change="inlcudeAttribute" />
      <PriceInput :init-value="dish.price_cents" @price-change="inlcudeAttribute" />
      <MenuSelectInput
        :init-value="menusStore.currentMenu"
        :menus="menusStore.menus"
        @menu-change="includeMenuAttribute" 
      />
      <DescriptionInput :init-value="dish.description" @description-change="inlcudeAttribute" />
    </div>

    <div class="col-lg-6">
      <ImageInput :init-value="dish.image" @img-change="inlcudeAttribute" />
    </div>
  </DefaultForm>
</template>
