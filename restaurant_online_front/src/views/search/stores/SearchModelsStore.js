import { defineStore } from "pinia";
import { ref, computed } from "vue";
import restaurantService from "../../services/restaurants/restaurant_service";
import tokensService from "../../services/tokensService";

export const useSearchModelsStore = defineStore('SearchModelsStore', () => {
  const searchedModels = ref([])
  const searchText = ref('')

  const models = computed(() => {
    return searchedModels.value
  })

  const restaurants = computed(() => {    
    return models.value.filter(m => m.type === 'Restaurant')
  })

  const dishes = computed(() => {
    return models.value.filter(m => m.type === 'Dish')
  })

  const fetchSearch = async (callback) => {
    let { response, isSuccessful } = await restaurantService.apiRestaurantSearch(searchText.value)

    if (isSuccessful) {
      tokensService.setAuthTokens(response.headers)
      searchedModels.value = response.data

      callback(response)
    }
  }

  const search = async (searchInputText) => {
    searchText.value = searchInputText

    await fetchSearch((_response) => {})
  }

  return {
    fetchSearch,
    search,
    restaurants,
    dishes,
    models
  }
})