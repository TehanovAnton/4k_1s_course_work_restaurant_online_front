<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { useRestaurantsStore } from '../../stores/RestaurantsStore';
import restaurant_service from '../../../services/restaurants/restaurant_service';
import TeammateRow from './TeammateRow.vue';
import CommandStructureStyle from './style_components/CommandStructureStyle.vue';
import { RestaurantApi } from '../../../../views/services/api/RestaurantApi'
import { useTeammatesStore } from './stores/teammatesStore';
import { useFormErrorsStore } from '../../../../stores/FormErrorsStore';
import CreateCookAccount from '../../../../components/users/forms/CreateCookAccount.vue';

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
    <p v-for="teammate in restaurantTeamates">
      <TeammateRow
        :teammate="teammate" 
        @remove-cook="removeCook"
      />
    </p>

    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            Add Cook
          </button>
        </h2>

        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <CreateCookAccount />
          </div>
        </div>
      </div>
    </div>
  </CommandStructureStyle>
</template>errorStore