import {Observable} from 'rxjs/Observable';
import {ShoppingCart} from '../models/shopping-cart';
import {Product} from '../models/product';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShoppingCartItem} from "shared/models/shopping-cart-item";

@Injectable()
export class ShoppingCartService {

  url = 'http://localhost:8080/cart';

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  async getCart(): Promise<Observable<ShoppingCart>> {

    let cartId = await this.getOrCreateCartId();

    return this.httpClient.get<ShoppingCart>(this.url + "/" + cartId)
      .map(value => new ShoppingCart(value))

  }

  async addToCart(shoppingCart: ShoppingCart, product: Product) {
    await this.updateItem(shoppingCart, product, 1);
  }

  async removeFromCart(shoppingCart: ShoppingCart, product: Product) {
    await this.updateItem(shoppingCart, product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    // this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create(): Observable<ShoppingCart> {
    return this.httpClient.post<ShoppingCart>(this.url, "");

  }

  private getItem(cartId: string, productId: string): Observable<ShoppingCartItem> {
    return this.httpClient.get<ShoppingCartItem>(this.url + "/" + cartId + "/product/" + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    this.create().subscribe(cart => {
      localStorage.setItem('cartId', cart.cartId);
    });

    return localStorage.getItem('cartId');
  }

  private async updateItem(shoppingCart: ShoppingCart, product: Product, change: number) {

    let item = shoppingCart.map.get(product.productId)
    let quantity = (item === undefined ? 0 : item.quantity) + change;


    if (quantity === 0) {
      this.httpClient.delete(this.url + "/" + shoppingCart.cartId + "/product/" + product.productId, "").subscribe();
      item.quantity = 0
      console.log("remove item from cart")
    } else {
      this.httpClient.put(this.url + "/" + shoppingCart.cartId + "/product/" + product.productId + "?quantity=" + quantity, "").subscribe();
      item.quantity = quantity
      console.log("updating item from cart")
    }

    // let cartId = await this.getOrCreateCartId();
    // let item$ = this.getItem(cartId, product.productId);
    //
    // item$.take(1).subscribe(item => {
    //   let quantity = (item.quantity || 0) + change;
    //   console.log("item quantity=" + item.quantity + ", change=" + change)
    //   if (quantity === 0) {
    //     console.log("remove item from cart")
    //     //item$.remove();
    //     this.httpClient.put(this.url + "/" + cartId + "/product/" + product.productId + "?quantity=" + quantity, "").subscribe();
    //   } else {
    //     console.log("updating item from cart")
    //   }
    //   //   item$.update({
    //   //   name: product.name,
    //   //   imageUrl: product.imageUrl,
    //   //   price: product.price,
    //   //   quantity: quantity
    //   // });
    // }, error => console.log('oops', error));


  }

}
