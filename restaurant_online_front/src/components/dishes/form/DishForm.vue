<script setup>
  import { ref } from 'vue';
  import { useMenusStore } from '../../../views/menus/stores/MenusStore';
  import ImageInput from './inputs/ImageInput.vue';
  import NameInput from './inputs/NameInput.vue';
  import PriceInput from './inputs/PriceInput.vue'
  import DescriptionInput from './inputs/DescriptionInput.vue'
  import MenuSelectInput from './inputs/MenuSelectInput.vue';

  const props = defineProps(['dish', 'actionName'])
  const emits = defineEmits(['formSubmit', 'cancel'])

  const menusStore = useMenusStore()
  const modefiedDish = ref({ 
    id: props.dish.id,
    attributes: {
      menu_id: props.dish.menu_id
    }
  })

  const inlcudeAttribute = (attr, sourceObjectAttr = attr, sourceObject = props.dish) => {
    modefiedDish.value.attributes[attr] = sourceObject[sourceObjectAttr]
  }

  const includeMenuAttribute = (attr, sourceObjectAttr = attr, sourceObject) => {
    menusStore.setMenu(sourceObject)
    inlcudeAttribute(attr, sourceObjectAttr, sourceObject)
  }
</script>

<template>
  <form>
    <div v-if="actionName == 'create'">
      <MenuSelectInput :init-value="menusStore.currentMenu"
                       :menus="menusStore.menus"
                       @menu-change="includeMenuAttribute" />
    </div>

    <ImageInput :init-value="dish.image" @img-change="inlcudeAttribute" />

    <div class="centrenize-content-column">
      <NameInput :init-value="dish.name" @name-change="inlcudeAttribute" />
    </div>

    <div>
      <DescriptionInput :init-value="dish.description" @description-change="inlcudeAttribute"/>
    </div>

    <div>
      <PriceInput :init-value="dish.price_cents" @price-change="inlcudeAttribute" />
    </div>

    <button type="button" @click="$emit('formSubmit', modefiedDish)">
      {{ actionName }}
    </button>

    <button type="button" @click="$emit('cancel')">
      back
    </button>
  </form>
</template>