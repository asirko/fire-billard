import {Component, OnInit, OnDestroy} from '@angular/core';
import { RecordService } from "../../services/record.service";
import { Record } from "../../models/record";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Observable} from "rxjs";
import * as EnumResultat from "../add-record/resultat-enum";
import * as EnumMain from "../add-record/main-enum";

@Component({
  selector: 'app-managed-record',
  templateUrl: './managed-record.component.html',
  styleUrls: ['./managed-record.component.scss'],
})
export class ManagedRecordComponent implements OnInit, OnDestroy {

  private records$ : Observable<Array<Record>>;
  private selectedRecord : Record = null;

  constructor(private recordService : RecordService,
              private userService : UserService) { }

  ngOnInit() {
    let records$ = this.recordService.getRecords$(),
        users$ = this.userService.getUsers$();

    this.records$ = Observable.combineLatest(users$, records$, (users: Array<User>, records: Array<Record>) => {
      return records.map(addOpponent).sort(byReverseDate);

      // cb
      function addOpponent(record: Record) {
        if (record.opponentId) {
          record.opponent = users.find(user => user.userId === record.opponentId);
        }
        return record;
      }

      function byReverseDate (a : Record, b : Record) {
        return b.date - a.date
      }
    });
  }

  ngOnDestroy() { }

  static getFormattedResultat(record : Record) : string {
    if (record.resultat === EnumResultat.CODE_FERME) {
      return record.main === EnumMain.CODE_CASSE ? 'Casse ferme' : 'Reprise ferme';
    } else if (record.resultat === EnumResultat.CODE_GAGNE) {
      return 'Gagné';
    } else {
      return 'Perdu';
    }
  }

  selectRecord (record: Record) : void {
    this.selectedRecord = record;
  }

  reactToPopin(decision: boolean) {
    if (decision) {
      this.recordService.removeRecord(this.selectedRecord);
    }
    this.selectedRecord = null;
  }

}
