import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { AuthProviders } from "angularfire2";
import { AuthGuardService } from "../../services/auth-guard.service";
import { Observable, Subscription } from "rxjs";
import { User } from "../../models/user";

@Component({
  selector: 'app-nav-bar',
  templateUrl: 'nav-bar.component.html',
  styleUrls: ['nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  public isAuthentified$ : Observable<boolean>;
  public user : User;

  private subIsAuth : Subscription;

  private isMenuOpen: boolean = false;

  constructor( private authService : AuthService,
               private authGuardService : AuthGuardService ) { }

  ngOnInit() {
    this.isAuthentified$ = this.authGuardService.isAuthentified();
    this.subIsAuth = this.isAuthentified$.subscribe(() => {
      this.user = this.authService.getUser();
    });
  }

  ngOnDestroy() {
    this.subIsAuth.unsubscribe();
  }

  login() {
    this.authService.login(AuthProviders.Facebook);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

}
