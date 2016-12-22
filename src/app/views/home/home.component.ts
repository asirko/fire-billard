import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { HomeData } from "./home-data";
import { FirebaseObjectObservable } from "angularfire2";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  providers: [],
  styleUrls: ['home.component.sass']
})
export class HomeComponent implements OnInit {

  public homeData$: FirebaseObjectObservable<HomeData>;

  constructor(private hs: HomeService) {
    this.homeData$ = hs.getHomeObservable();
  }

  ngOnInit() { }

}
