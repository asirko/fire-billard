import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { AuthGuardService } from "../../services/auth-guard.service";

@Component({
  selector: 'app-main-actions',
  templateUrl: './main-actions.component.html',
  styleUrls: ['./main-actions.component.scss']
})
export class MainActionsComponent implements OnInit {
  public isAuthentified$ : Observable<boolean>;

  constructor( private authGuardService : AuthGuardService ) { }

  ngOnInit() {
    this.isAuthentified$ = this.authGuardService.isAuthentified();
  }

}
