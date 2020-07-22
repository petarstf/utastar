import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { OverviewLayoutComponent } from './components/overview-layout/overview-layout.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewFirstComponent } from './components/overview-first/overview-first.component';
import { OverviewSecondComponent } from './components/overview-second/overview-second.component';
import { OverviewThirdComponent } from './components/overview-third/overview-third.component';
import { OverviewFourthComponent } from './components/overview-fourth/overview-fourth.component';


@NgModule({
  declarations: [
    OverviewLayoutComponent,
    OverviewFirstComponent,
    OverviewSecondComponent,
    OverviewThirdComponent,
    OverviewFourthComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    OverviewLayoutComponent
  ]
})
export class OverviewModule { }
