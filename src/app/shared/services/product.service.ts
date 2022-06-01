import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Product} from "shared/models/product";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class ProductService {

  //constructor(private db: AngularFireDatabase) { }

  url = 'http://localhost:8080/product';

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  create(product) {
    //return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url);

  }

  get(productId): Observable<Product> {
    return this.httpClient.get<Product>(this.url + "/" + productId);
  }

  update(productId, product) {
    //return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    //return this.db.object('/products/' + productId).remove();
  }
}
