import { Component } from '@angular/core';
import { AuthProviders } from "angularfire2";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor( private authService: AuthService ) {
  }

  login() {
    this.authService.login(AuthProviders.Facebook);
  }

  logout() {
    this.authService.logout();
  }
}
