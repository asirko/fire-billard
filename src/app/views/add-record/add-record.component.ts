import { Component, OnInit } from '@angular/core';
import { RecordService } from "../../services/record.service";
import 'rxjs/add/operator/take';
import * as MainEnum from './main-enum';
import * as ResultatEnum from './resultat-enum';

@Component({
  selector: 'app-add-record',
  templateUrl: 'add-record.component.html',
  providers: [],
  styleUrls: ['add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  public MainEnumValues = MainEnum.VALUES;
  public ResultatEnumValues = ResultatEnum.VALUES;
  public main;
  public resultat;

  constructor(private rs: RecordService) {}

  ngOnInit() { }

  enregistrerPartie() {
    this.rs.addRecord(this.main, this.resultat).then( () => {
      this.main = null;
      this.resultat = null;
    });
  }

}
