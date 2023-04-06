<script setup>
  import { ref } from 'vue';
  import { useMenusStore } from '../../../views/menus/stores/MenusStore';
  import ImageInput from './inputs/ImageInput.vue';
  import NameInput from './inputs/NameInput.vue';
  import PriceInput from './inputs/PriceInput.vue'
  import DescriptionInput from './inputs/DescriptionInput.vue'

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
</script>

<template>
  <form>
    <div v-if="actionName == 'create'">
      <label for="menu-slect">Choose Menu</label>
      <select v-model="menusStore.currentMenu"
              @change="inlcudeAttribute('menu_id', 'id', menusStore.currentMenu)">
        <option v-for="menu in menusStore.menus"
                v-bind:value="menu">
          {{ menu.name }}
        </option>
      </select>
    </div>

    <ImageInput @img-change="inlcudeAttribute" />

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