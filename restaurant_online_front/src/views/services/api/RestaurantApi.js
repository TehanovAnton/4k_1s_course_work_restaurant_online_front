import tokensService from "../tokensService";
import { BaseApi } from "./baseApi";

export class RestaurantApi extends BaseApi {
  async removeCook(restaurantId, data, errorsStore, successCallback) {
    this.args = {
      url: `http://localhost:3000/restaurants/${restaurantId}`,
      data: data,
      requestOptions: {
        headers: tokensService.auth_headers()
      }
    }

    await this.requestBase('put', errorsStore, successCallback)
  }
}