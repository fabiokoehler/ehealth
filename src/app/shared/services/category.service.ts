import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class CategoryService {

  // constructor(private db: AngularFireDatabase) { }
  //
  // getAll() {
  //   return this.db.list('/categories', {
  //     query: {
  //       orderByChild: 'name'
  //     }
  //   });
  // }

  url = 'http://localhost:8080/category'; // api rest fake

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  getAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url)
  }
}
