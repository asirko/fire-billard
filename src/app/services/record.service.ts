import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2/angularfire2";
import { HomeService } from "./home.service";
import * as EnumResultat from "../views/add-record/resultat-enum";
import * as EnumMain from "../views/add-record/main-enum";
import { AuthService } from "./auth.service";
import { ToastsManager } from "ng2-toastr";
import { FirebaseListObservable } from "angularfire2";
import { Record } from "../models/record";
import { AgregatedRecord } from "../models/agregated-record";
import { Observable } from "rxjs";

@Injectable()
export class RecordService {
  private records$ : FirebaseListObservable<Array<Record>>;
  private agregatedRecord$ : Observable<any>;

  constructor(private af: AngularFire,
              private hs: HomeService,
              private as : AuthService,
              public toastr: ToastsManager) {

    let user = this.as.getUser();
    if (!user || !user.userId) {
      throw 'utilisateur non connecté';
    }
    this.records$ = this.af.database.list('records/' + user.userId);

    this._initAgregatedResults$();
  }

  public addRecord(main, resultat): Promise<any> {
    if (!main || !resultat) {
      throw 'Arguments invalides pour addRecord'
    }

    return Promise.resolve(this.records$.push({main, resultat, date: new Date().getTime()}).then( () => {
      this.hs.updateHomeGames(resultat === EnumResultat.CODE_FERME);
      this.toastr.success('Partie enregistrée !');
    }));
  }

  private _initAgregatedResults$() : void {
    this.agregatedRecord$ = new Observable((observer) => {
      this.records$.subscribe((records) => {
        let agregatedResults : AgregatedRecord = records.reduce((accu: AgregatedRecord, current: Record) => {
          if (current.main === EnumMain.CODE_CASSE && current.resultat === EnumResultat.CODE_PERDU) {
            accu.cassePerdu++;
          }
          if (current.main === EnumMain.CODE_CASSE &&
                    (current.resultat === EnumResultat.CODE_GAGNE || current.resultat === EnumResultat.CODE_FERME)) {
            accu.casseGagne++;
          }
          if (current.main === EnumMain.CODE_CASSE && current.resultat === EnumResultat.CODE_FERME) {
            accu.casseFerme++;
          }
          if (current.main === EnumMain.CODE_REPRISE && current.resultat === EnumResultat.CODE_PERDU) {
            accu.reprisePerdu++;
          }
          if (current.main === EnumMain.CODE_REPRISE &&
                    (current.resultat === EnumResultat.CODE_GAGNE || current.resultat === EnumResultat.CODE_FERME)) {
            accu.repriseGagne++;
          }
          if (current.main === EnumMain.CODE_REPRISE && current.resultat === EnumResultat.CODE_FERME) {
            accu.repriseFerme++;
          }
          return accu;
        }, new AgregatedRecord());
        observer.next(agregatedResults);
      });
    });
  }

  public getAgregatedResults$() : Observable<any> {
    return this.agregatedRecord$;
  }
}
