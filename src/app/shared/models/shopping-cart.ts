import {Product} from './product';
import {ShoppingCartItem} from './shopping-cart-item';
import {CartProduct} from "shared/models/cart-product";

export class ShoppingCart {

  cartId: string;
  products: CartProduct[] = [];
  map = new Map<string, ShoppingCartItem>();

  items: ShoppingCartItem[] = [];

  constructor(sc: ShoppingCart) {

    Object.assign(this, sc);

    sc.products.map(product => {
      let shoppingCartItem = new ShoppingCartItem({
        $key: product.cartProductId,
        productId: product.productId,
        name: product.product.name,
        imageUrl: product.product.imageUrl,
        price: product.product.price,
        quantity: product.quantity
      });
      this.items.push(shoppingCartItem)
      this.map.set(product.productId, shoppingCartItem)
    })
  }

  getQuantity(product: Product): number {
    let item = this.map.get(product.productId);
    return item ? item.quantity : 0;
  }

  get totalPrice() {

    let sum = 0;
    this.map.forEach((value: ShoppingCartItem, key: string) => {
      sum += value.totalPrice;
    });
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    this.map.forEach((value: ShoppingCartItem, key: string) => {
      count += value.quantity;
    });

    return count;
  }
}
