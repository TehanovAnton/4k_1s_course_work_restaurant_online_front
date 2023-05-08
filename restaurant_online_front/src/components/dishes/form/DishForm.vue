<script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import { useMenusStore } from '../../../views/menus/stores/MenusStore';
  import ImageInput from './inputs/ImageInput.vue';
  import NameInput from './inputs/NameInput.vue';
  import PriceInput from './inputs/PriceInput.vue';
  import DescriptionInput from './inputs/DescriptionInput.vue';
  import MenuSelectInput from './inputs/MenuSelectInput.vue';
import RegularFormStyle from '../../stylecomponents/RegularFormStyle.vue';

  const props = defineProps(['dish', 'actionName']);
  const emits = defineEmits(['formSubmit', 'cancel']);

  const menusStore = useMenusStore();
  const modefiedDish = ref({
    id: props.dish.id,
    attributes: {
      menu_id: props.dish.menu_id,
      image_file: null,
      image_url: props.dish.image_url,
      name: props.dish.name,
      price: props.dish.price,
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
  <form>
    <div class="row bg-light">
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
    </div>

    <div class="row bg-light">
      <div class="d-flex justify-content-around">
        <button class="btn btn-outline-success" @click="onFormSubmit">
          {{ props.actionName }}
        </button>

        <button class="btn btn-outline-dark" @click="onCancel">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>
