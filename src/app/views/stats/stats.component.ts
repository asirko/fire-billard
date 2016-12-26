import { Component, OnInit } from '@angular/core';
import {RecordService} from "../../services/record.service";
import {Observable} from "rxjs";
import {AgregatedRecord} from "../../models/agregated-record";

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.scss']
})
export class StatsComponent implements OnInit {
 public agregatedRecords$ : Observable<AgregatedRecord>;

  constructor(public rs : RecordService) {
    this.agregatedRecords$ = rs.getAgregatedResults$();
  }

  ngOnInit() { }

}
