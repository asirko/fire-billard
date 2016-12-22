import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2/angularfire2";
import { HomeService } from "./home.service";
import { CODE_FERME } from "../views/add-record/resultat-enum";
import { AuthService } from "./auth.service";

@Injectable()
export class RecordService {

  constructor(private af: AngularFire,
              private hs: HomeService,
              private as : AuthService) { }

  public addRecord(main, resultat): void {
    let user = this.as.getUser();

    if (!user || !user.userId) {
      throw 'utilisateur non connecté';
    }

    this.af.database.list('record/' + user.userId).push({main, resultat}).then( () => {
      this.hs.updateHomeGames(resultat === CODE_FERME);
    });
  }
}
