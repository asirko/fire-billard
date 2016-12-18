import { Injectable } from '@angular/core';
import { HomeData } from "../home/home-data";
import { FirebaseObjectObservable } from "angularfire2";
import { AngularFire } from "angularfire2/angularfire2";
import 'rxjs/add/operator/take';

@Injectable()
export class HomeService {
  private home$: FirebaseObjectObservable<HomeData>;

  constructor(private af: AngularFire) {
    this.home$ = af.database.object('home');
  }

  public getHomeObservable(): FirebaseObjectObservable<HomeData> {
    return this.home$;
  }

  public updateHomeGames(isFerme: boolean): void {
    this.home$.take(1).subscribe( (snap) => {
      let updatedHomeData: HomeData = {
        nbFermes: snap.nbFermes,
        nbInscrits: snap.nbInscrits,
        nbParties: snap.nbParties
      };
      updatedHomeData.nbParties ++;
      if (isFerme) {
        updatedHomeData.nbFermes++;
      }
      this.home$.set(updatedHomeData);
    });
  }

  public updateHomeUsers(): void {
    this.home$.take(1).subscribe( (snap) => {
      let updatedHomeData: HomeData = {
        nbFermes: snap.nbFermes,
        nbInscrits: snap.nbInscrits,
        nbParties: snap.nbParties
      };
      updatedHomeData.nbInscrits ++;
      this.home$.set(updatedHomeData);
    });
  }
}
