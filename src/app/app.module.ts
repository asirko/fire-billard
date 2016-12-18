import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthProviders, AuthMethods } from "angularfire2/index";
import { AngularFireModule } from "angularfire2/angularfire2";

import { AuthService } from "./services/auth.service.ts";
import { HomeService } from "./services/home.service";
import { RecordService } from "./services/record.service";

import { firebaseConfig } from '../environments/firebaseConfig';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatsComponent } from './stats/stats.component';
import { AddRecordComponent } from './add-record/add-record.component';
import { AppRoutingModule } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    AddRecordComponent,
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
