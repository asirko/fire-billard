import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private af: AngularFire, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.isAuthentified().map((isAuthentified) =>  {
      if(!isAuthentified) {
        this.router.navigate(['/home']);
      }
      return isAuthentified;
    }).first()
  }

  isAuthentified(): Observable<boolean> {
    return this.af.auth.map( auth => auth !== null );
  }
}
