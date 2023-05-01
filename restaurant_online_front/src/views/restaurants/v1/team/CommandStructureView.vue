<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRestaurantsStore } from '../../stores/RestaurantsStore';
import restaurant_service from '../../../services/restaurants/restaurant_service';
import { useDishFormErrorsStore } from '../../../dishes/stores/dishFormErrorsStore';
import TeammateRow from './TeammateRow.vue';
import CommandStructureStyle from './style_components/CommandStructureStyle.vue';
import { RestaurantApi } from '../../../../views/services/api/RestaurantApi'
import { useTeammatesStore } from './stores/teammatesStore';
import ErrorsShift from '../../../../components/errors/ErrorsShift.vue';
import { useFormErrorsStore } from '../../../../stores/FormErrorsStore';

  const teamatesStore = useTeammatesStore()
  const formErrosStore = useFormErrorsStore()
  const restaurantsStore = useRestaurantsStore()

  const currentRestaurant = computed(() => restaurantsStore.currentRestaurant)

  onBeforeMount(async () => {
    await teamatesStore.fetchTeammates()
    formErrosStore.clearErrors()
    dataReady.value = true
  })

  const dataReady = ref(false)

  const restaurantTeamates = computed(() => {
    return teamatesStore.teamates
  })

  const removeCook = async (teamate) => {
    let data = {
      restaurant: {
        restaurants_cooks_attributes: {
          id: teamate.id,
          _destroy: 1
        }
      }
    }

    let restaurantApi = new RestaurantApi()
    await restaurantApi.removeCook(
      currentRestaurant.value.id,
      data,
      formErrosStore,
      async () => {
        dataReady.value = false

        await teamatesStore.fetchTeammates()
        dataReady.value = true
      }
    )
  }
</script>

<template>
  <CommandStructureStyle v-if="dataReady">
    <ErrorsShift :errors-store="formErrosStore" />

    <p v-for="teammate in restaurantTeamates">
      <TeammateRow
        :teammate="teammate" 
        @remove-cook="removeCook"
      />
    </p>
  </CommandStructureStyle>
</template>errorStore