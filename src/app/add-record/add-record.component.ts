import { Component, OnInit } from '@angular/core';
import { RecordService } from "../services/record.service";
import { FirebaseListObservable } from "angularfire2";
import { HomeService } from "../services/home.service";
import 'rxjs/add/operator/take';
import * as MainEnum from './main-enum';
import * as ResultatEnum from './resultat-enum';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  providers: [],
  styleUrls: ['./add-record.component.sass']
})
export class AddRecordComponent implements OnInit {

  private record$: FirebaseListObservable<any>;
  public MainEnumValues = MainEnum.VALUES;
  public ResultatEnumValues = ResultatEnum.VALUES;

  constructor(private ars: RecordService, private hs: HomeService) {
    this.record$ = ars.getRecordObservable();
  }

  ngOnInit() { }

  enregistrerPartie(main, resultat) {
    // TODO: à mettre dans le RecordService
    this.record$.push({main, resultat}).then( () => {
      this.hs.updateHomeGames(resultat === 'ferme');
    });
  }

}
