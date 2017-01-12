import { Injectable } from '@angular/core';
import {User} from "../models/user";
import {FirebaseListObservable, AngularFire} from "angularfire2";

@Injectable()
export class UserService {

  private users$ : FirebaseListObservable<Array<User>>;

  constructor (private af: AngularFire) {
    this.users$ = this.af.database.list('users');
  }

  getUsers$ () {
    return this.users$;
  }

}
