import { Component } from '@angular/core';
import { initializeApp, database } from 'firebase';
import {AngularFire} from "angularfire2/angularfire2";
import {FirebaseListObservable} from "angularfire2/index";
import {AuthProviders} from "angularfire2/index";
import {AuthService} from "./services/auth.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private user$: Observable;

  constructor( private authService: AuthService ) {
    this.user$ = authService.getUser$();
  }

  login() {
    this.authService.login(AuthProviders.Facebook);
  }

  logout() {
    this.authService.logout();
  }
}
