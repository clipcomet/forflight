import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetarComponent } from './metar/metar.component';
import { TafComponent } from './taf/taf.component';
import { FullComponent } from './full/full.component';
import { FormsModule } from '@angular/forms';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { UserActivityComponent } from './user-activity/user-activity.component';

@NgModule({
  declarations: [
    AppComponent,
    MetarComponent,
    TafComponent,
    FullComponent,
    NavButtonsComponent,
    UserActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
