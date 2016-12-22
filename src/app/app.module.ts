import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthProviders, AuthMethods } from "angularfire2";
import { AngularFireModule } from "angularfire2/angularfire2";

import { AuthService } from "./services/auth.service";
import { HomeService } from "./services/home.service";
import { RecordService } from "./services/record.service";

import { firebaseConfig } from '../environments/firebaseConfig';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { StatsComponent } from './views/stats/stats.component';
import { AddRecordComponent } from './views/add-record/add-record.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    AddRecordComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }),
    AppRoutingModule
  ],
  providers: [AuthService, HomeService, RecordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
