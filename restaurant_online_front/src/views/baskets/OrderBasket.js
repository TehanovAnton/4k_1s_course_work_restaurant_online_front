export class OrderBasket {
  constructor(dishes) {
    this.dishes = dishes
  }

  basketDishCount = (dish) => {
    if (!!!this.dishes)
      return 0
  
    let dishes = this.dishes.filter(d => d.id === dish.id)
    return dishes.length
  }

  basketDishesPrice() {
    let price = 0

    this.dishes.forEach(dish => {
      price += parseInt(dish.price_cents) * this.basketDishCount(dish)
    })

    return price
  }
}