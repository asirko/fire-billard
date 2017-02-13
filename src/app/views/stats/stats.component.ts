import { Component, OnInit, OnDestroy } from '@angular/core';
import {RecordService} from "../../services/record.service";
import {Subscription} from "rxjs";
import {AgregatedRecord} from "../../models/agregated-record";
import {User} from "../../models/user";

@Component({
  selector: 'app-stats',
  templateUrl: 'stats.component.html',
  styleUrls: ['stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  private sub : Subscription;
  public agregatedRecords : AgregatedRecord;
  public filterUser : User;

  public displaySearching : boolean;

  constructor(public rs : RecordService) { }

  ngOnInit() {
    this.sub = this.rs.getAgregatedResults$().subscribe(agregation => {
      this.agregatedRecords = agregation;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleSearch() : void {
    this.displaySearching = !this.displaySearching;
  }

  selectOpponent(filterUser: User) : void {
    this.displaySearching = false;
    this.filterUser = filterUser;
    this.sub.unsubscribe();
    this.sub = this.rs.getAgregatedResults$(filterUser).subscribe(agregation => {
      this.agregatedRecords = agregation;
    });
  }
}
