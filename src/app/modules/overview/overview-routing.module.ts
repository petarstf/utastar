import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OverviewLayoutComponent } from './components/overview-layout/overview-layout.component';

const routes: Routes = [
  { path: '', component: OverviewLayoutComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OverviewRoutingModule { }
