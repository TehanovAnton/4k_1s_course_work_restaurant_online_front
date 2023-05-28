import { Base } from "./baseCancel";
import { useOrdersStore } from '../../orders/stores/OrdersStore'
import { CacncelToRestaurant } from "./CancelToRestaurant";

export class CacncelToOrders extends Base {
  constructor() {
    super()

    this.ordersStore = useOrdersStore()
  }

  cancel() {
    if (this.ordersStore.orders && this.ordersStore.orders.length != 0) {
      return this.setCancelContent('OrdersIndexView')
    }

    return new CacncelToRestaurant().cancel()
  }
}