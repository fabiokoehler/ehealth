import {AppUser} from '../models/app-user';
import {Injectable} from '@angular/core';
import {User} from "shared/models/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

//  constructor(private db: AngularFireDatabase) { }

  save(user: User) {
    // this.db.object('/users/' + user.uid).update({
    //   name: user.displayName,
    //   email: user.email
    // });
  }

  get(uid: string): Observable<AppUser> {
    // return this.db.object('/users/' + uid);
    return Observable.create((observer) => {
      observer.next({uid: "123", name: "Test", isAdmin: true})
    });
  }
}
