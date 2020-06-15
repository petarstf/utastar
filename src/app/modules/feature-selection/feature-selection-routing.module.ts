import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatureSelectionLayoutComponent } from './components/feature-selection-layout/feature-selection-layout.component';
import { FeatureSelectionFormComponent } from './components/feature-selection-form/feature-selection-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  {
    path: 'form',
    component: FeatureSelectionFormComponent
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureSelectionRoutingModule { }
