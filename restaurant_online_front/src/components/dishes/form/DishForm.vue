<script setup>
  import { ref } from 'vue';
  import { defineProps, defineEmits } from 'vue';
  import { useMenusStore } from '../../../views/menus/stores/MenusStore';
  import ImageInput from './inputs/ImageInput.vue';
  import NameInput from './inputs/NameInput.vue';
  import PriceInput from './inputs/PriceInput.vue';
  import DescriptionInput from './inputs/DescriptionInput.vue';
  import MenuSelectInput from './inputs/MenuSelectInput.vue';

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
  <div class="dish-form">
    <div class="dish-form__image">
      <ImageInput
        :init-value="dish.image"
        @img-change="inlcudeAttribute"
      />
    </div>

    <div class="dish-form__content">
      <div class="left-column-inputs">
        <NameInput :init-value="dish.name" @name-change="inlcudeAttribute" />
        <PriceInput :init-value="dish.price_cents" @price-change="inlcudeAttribute" />
        <MenuSelectInput
          :init-value="menusStore.currentMenu"
          :menus="menusStore.menus"
          @menu-change="includeMenuAttribute" 
        />
      </div>

      <div class="right-column-inputs">
        <DescriptionInput :init-value="dish.description" @description-change="inlcudeAttribute" />
      </div>
    </div>

    <div class="dish-form__actions">
      <button class="btn btn-primary" @click="onFormSubmit">
        {{ props.actionName }}
      </button>
      <button class="btn btn-secondary" @click="onCancel">
        Cancel
      </button>
    </div>
  </div>
</template>

<style lang="scss">
  .left-column-inputs {
    display: flex;
    flex-direction: column;
  }

  .right-column-inputs {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }
  .dish-form__content {
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: row;
    justify-content: space-evenly;
  }

  .dish-form {
    width: 40%;
    border: 1px solid #ccc;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .text-input {
      border-width: thin;
      border-right: none;
      border-left: none;
      border-top: none;
      margin: 10px;
      outline: none
    }
  }

  .dish-form__image {
    width: 100%;
    display: flex;
    margin-bottom: 1rem;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  .dish-form__image img {
    width: 100%;
    height: 100%;
  }

  .dish-form__actions {
    display: flex;
    width: 70%;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
