import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {FirebaseListObservable, AngularFire} from "angularfire2";

@Injectable()
export class UserService {

  private users$ : FirebaseListObservable<Array<User>>;
  private users : Array<User>;

  constructor (private af: AngularFire) {
    this.users$ = this.af.database.list('users');
    this.users$.subscribe((users) => {
      this.users = users;
    });
  }

  getUsers$ () : FirebaseListObservable<Array<User>> {
    return this.users$;
  }

  getUsers () : Array<User> {
    return this.users;
  }

}
