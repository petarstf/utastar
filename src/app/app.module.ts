import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { FeatureSelectionModule } from './modules/feature-selection/feature-selection.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableService } from './shared/services/table.service';
import { HttpService } from './shared/services/http.service';
import { HttpClientModule } from '@angular/common/http';

const APP_MODULES = [
  FeatureSelectionModule,
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,

    ...APP_MODULES,

    FontAwesomeModule,


  ],
  providers: [TableService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
