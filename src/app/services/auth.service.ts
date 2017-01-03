import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2/angularfire2";
import Reference = firebase.database.Reference;
import { User } from "../models/user";
import { HomeService } from "./home.service";

@Injectable()
export class AuthService {
  private user: User;

  constructor( private af : AngularFire, private hs : HomeService ) {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = {
          username: user.facebook.displayName,
          email: user.facebook.email,
          profilePicture: user.facebook.photoURL,
          userId: user.uid
        };
        this.writeUserData();
      } else {
        // user n'est pas connecté
        this.user = null;
      }
    });
  }

  private writeUserData() : void {
    this.af.database.object('users/' + this.user.userId).take(1).subscribe((snap) => {
      if (!snap.userId) {
        this.hs.updateHomeUsers();
      }
      this.af.database.object('users/' + this.user.userId).update(this.user);
    });
  }

  login(provider) : void {
    // alert('login ?');
    this.af.auth.login({
      provider: provider
    })/*.then(() => {
      alert('pas d\'erreur');
    }).catch( () => {
      alert('error')
    })*/;
  }

  logout() : void {
    this.af.auth.logout();
  }

  getUser() : User{
    return this.user;
  }

}
