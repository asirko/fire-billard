import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthProviders, AuthMethods } from "angularfire2";
import { AngularFireModule } from "angularfire2/angularfire2";
import { ToastModule, ToastOptions } from "ng2-toastr";
import { BusyModule } from 'angular2-busy';

import { AuthService } from "./services/auth.service";
import { HomeService } from "./services/home.service";
import { RecordService } from "./services/record.service";

import { firebaseConfig } from '../environments/firebaseConfig';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { StatsComponent } from './views/stats/stats.component';
import { AddRecordComponent } from './views/add-record/add-record.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainActionsComponent } from './components/main-actions/main-actions.component';
import { MenuComponent } from './components/menu/menu.component';
import { ManagedRecordComponent } from './views/managed-record/managed-record.component';
import { SearchUserComponent } from './components/search-user/search-user.component';
import {UserService} from "./services/user.service";
import { PopinValidationComponent } from './components/popin-validation/popin-validation.component';

let options: ToastOptions = new ToastOptions({
  animate: 'flyRight',
  positionClass: 'toast-bottom-right',
});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    AddRecordComponent,
    NavBarComponent,
    MainActionsComponent,
    MenuComponent,
    ManagedRecordComponent,
    SearchUserComponent,
    PopinValidationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup
    }),
    AppRoutingModule,
    ToastModule.forRoot(options),
    BusyModule
  ],
  providers: [
    AuthService,
    HomeService,
    RecordService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
