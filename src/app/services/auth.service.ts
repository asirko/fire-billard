import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2/angularfire2";
import { Subject } from "rxjs/Subject";
import Reference = firebase.database.Reference;
import { User } from "./user";
import 'rxjs/add/operator/take';
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
  private userSubject: Subject<User> = new Subject<User>();

  constructor( private af : AngularFire ) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        let shortUser: User = {
          username: user.facebook.displayName,
          email: user.facebook.email,
          profilePicture: user.facebook.photoURL,
          userId: user.uid
        };
        this.writeUserData(shortUser);
        this.userSubject.next(shortUser);
      } else {
        // user n'est pas connecté
        this.userSubject.next(null);
      }
    });
  }

  writeUserData(shortUser) : void {
    this.af.database.object('users/' + shortUser.userId).take(1).subscribe((snap) => {
      if (!snap.userId) {
        console.log('création');
      }
      this.af.database.object('users/' + shortUser.userId).update(shortUser);
    });
  }

  login(provider) : void {
    this.af.auth.login({
      provider: provider
    });
  }

  logout() : void {
    this.af.auth.logout();
  }

  getUser$() : Observable<User>{
    return this.userSubject.asObservable();
  }

}
