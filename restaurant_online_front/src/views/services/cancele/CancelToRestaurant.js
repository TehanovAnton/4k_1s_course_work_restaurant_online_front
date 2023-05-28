import { Base } from "./baseCancel";
import { useRestaurantsStore } from '../../restaurants/stores/RestaurantsStore'

export class CacncelToRestaurant extends Base {
  constructor() {
    super()

    this.restaurantsStore = useRestaurantsStore()
  }

  cancel() {
    if (!!this.restaurantsStore.currentRestaurant.id){
      return this.setCancelContent('RestaurantShowView')
    }

    return this.setCancelContent('RestaurantsIndexView')
  }
}