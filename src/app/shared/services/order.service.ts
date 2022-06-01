import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Order} from "shared/models/order";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class OrderService {

  url = 'http://localhost:8080/order';

  constructor(private httpClient: HttpClient) {
  }

  placeOrder(order): Observable<Order> {
    return this.httpClient.post<Order>(this.url, order);
  }

  getOrders(): Observable<Order[]> {
    //return this.db.list('/orders');
    return null;
  }

  getOrdersByUser(userId: string): Observable<Order> {
    return this.httpClient.get<Order>(this.url);
  }
}
