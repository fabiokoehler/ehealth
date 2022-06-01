import { ShoppingCart } from './shopping-cart';

export class Order {
  key: string;
  orderId: string;
  datePlaced: number;
  items: any[];

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          name: i.name,
          imageUrl: i.imageUrl,
          price: i.price,
          productId: i.productId
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }
}
