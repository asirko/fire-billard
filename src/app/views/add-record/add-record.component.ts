import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecordService } from "../../services/record.service";
import 'rxjs/add/operator/take';
import { AuthService } from "../../services/auth.service";
import { AuthGuardService } from "../../services/auth-guard.service";
import { User } from "../../models/user";
import { Observable, Subscription } from "rxjs";
import {ToastsManager} from "ng2-toastr";

const VAL_USER = 'user';
const VAL_OPPONENT = 'opponent';

@Component({
  selector: 'app-add-record',
  templateUrl: 'add-record.component.html',
  providers: [],
  styleUrls: ['add-record.component.scss']
})
export class AddRecordComponent implements OnInit, OnDestroy {

  public isAuthentified$ : Observable<boolean>;
  private subIsAuth : Subscription;

  public user : User;
  public opponent : User;
  public main : string;
  public victory : string;
  public ferme : boolean;

  public displaySearching : boolean;
  public enregistrement : Promise<any>;

  constructor(private rs : RecordService,
              private authService : AuthService,
              private authGuardService : AuthGuardService,
              public toastr: ToastsManager ) { }

  ngOnInit() {
    this.isAuthentified$ = this.authGuardService.isAuthentified();
    this.subIsAuth = this.isAuthentified$.subscribe(() => {
      this.user = this.authService.getUser();
    });
  }

  ngOnDestroy() {
    this.subIsAuth.unsubscribe();
  }

  enregistrerPartie() : void {
    this.enregistrement = this.rs.addRecord(this.opponent, this.main, this.victory, this.ferme).then( () => {
      this.main = null;
      this.victory = null;
      this.ferme = null;
      this.opponent = null;
      this.toastr.success('Partie enregistrée !');
    });
  }

  isUserVictorious() : boolean {
    return this.victory === VAL_USER;
  }

  isOpponentVictorious() : boolean {
    return this.victory === VAL_OPPONENT;
  }

  toggleSearch() : void {
    this.displaySearching = !this.displaySearching;
  }

  selectOpponent(opponent: User) : void {
    this.opponent = opponent;
    this.displaySearching = false;
  }

}
