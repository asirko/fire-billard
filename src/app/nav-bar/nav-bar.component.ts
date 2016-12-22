import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { AuthProviders } from "angularfire2";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass']
})
export class NavBarComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit() { }

  login() {
    this.authService.login(AuthProviders.Facebook);
  }

  logout() {
    this.authService.logout();
  }

}
