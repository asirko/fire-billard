import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./views/home/home.component";
import { StatsComponent } from "./views/stats/stats.component";
import { AddRecordComponent } from "./views/add-record/add-record.component";
import { ManagedRecordComponent } from "./views/managed-record/managed-record.component";
import { AuthGuardService } from "./services/auth-guard.service";

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-record', component: AddRecordComponent, canActivate: [AuthGuardService] },
  { path: 'manage-record', component: ManagedRecordComponent, canActivate: [AuthGuardService] },
  { path: 'stats', component: StatsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ],
  providers: [ AuthGuardService ]
})
export class AppRoutingModule {}
