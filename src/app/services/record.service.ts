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
import { User } from "../models/user";
import 'rxjs/add/operator/map';

const USER = 'user';

@Injectable()
export class RecordService {
  private records$ : FirebaseListObservable<Array<Record>>;
  private agregatedRecord$ : Observable<any>;
  private user : User;

  constructor(private af: AngularFire,
              private hs: HomeService,
              private as : AuthService,
              public toastr: ToastsManager) {

    this.user = this.as.getUser();
    if (!this.user || !this.user.userId) {
      throw 'utilisateur non connecté';
    }
    this.records$ = this.af.database.list('records/' + this.user.userId);

    this._initAgregatedResults$();
  }

  public addRecord(opponent: User, main: string, victory: string, isFerme: boolean): Promise<any> {
    if (!main || !victory) {
      throw 'Arguments invalides pour addRecord'
    }

    let userRecord : Record = new Record(),
        opponentRecord : Record = new Record(),
        promesses : Array<Promise<any>> = [];

    userRecord.date = new Date().getTime();
    opponentRecord.date = new Date().getTime();

    if (main === USER) {
      userRecord.main = EnumMain.CODE_CASSE;
      opponentRecord.main = EnumMain.CODE_REPRISE;
    } else {
      userRecord.main = EnumMain.CODE_REPRISE;
      opponentRecord.main = EnumMain.CODE_CASSE;
    }

    if (victory === USER) {
      userRecord.resultat = isFerme ? EnumResultat.CODE_FERME : EnumResultat.CODE_GAGNE;
      opponentRecord.resultat = EnumResultat.CODE_PERDU;
    } else {
      userRecord.resultat = EnumResultat.CODE_PERDU;
      opponentRecord.resultat = isFerme ? EnumResultat.CODE_FERME : EnumResultat.CODE_GAGNE;
    }

    if (opponent) {
      userRecord.opponentId = opponent.userId;
      opponentRecord.opponentId = this.user.userId;
    }

    promesses.push(Promise.resolve(this.records$.push(userRecord)));
    if (opponent) {
      promesses.push(Promise.resolve(this.af.database.list('records/' + opponent.userId).push(opponentRecord)));
    }

    return Promise.all(promesses).then(() => {
      this.hs.updateHomeGames(isFerme);
      this.toastr.success('Partie enregistrée !');
    });
  }

  private _initAgregatedResults$(){

    this.agregatedRecord$ = this.records$.map((records : Array<Record>) => {
      return records.reduce(RecordService._reduceRecords, new AgregatedRecord());
    });
  }

  private static _reduceRecords(accu: AgregatedRecord, current: Record) : AgregatedRecord {

    // comptabilisation des parties
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

    // calcul de la série la plus longue
    if (current.resultat === EnumResultat.CODE_GAGNE || current.resultat === EnumResultat.CODE_FERME) {
      accu.serieGagneeCourante++;
    } else {
      if (accu.serieGagneeLaPlusLongue < accu.serieGagneeCourante) {
        accu.serieGagneeLaPlusLongue = accu.serieGagneeCourante;
      }
      accu.serieGagneeCourante = 0;
    }
    return accu;
  }

  public getAgregatedResults$() : Observable<any> {
    return this.agregatedRecord$;
  }
}
