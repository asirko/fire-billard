import { Injectable } from '@angular/core';
import {FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";
import { AngularFire } from "angularfire2/angularfire2";
import { HomeData } from "../home/home-data";
import { HomeService } from "./home.service";

@Injectable()
export class RecordService {
  private record$: FirebaseListObservable<any>;
  private home$: FirebaseObjectObservable<HomeData>;

  constructor(private af: AngularFire, private hs: HomeService) {
    this.record$ = af.database.list('records');
    this.home$ = hs.getHomeObservable();
  }

  public getRecordObservable(): FirebaseListObservable<any> {
    return this.record$;
  }

  public addRecord(): void {

  }
}
