import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FeatureSelectionLayoutComponent } from './components/feature-selection-layout/feature-selection-layout.component';
import { FeatureSelectionRoutingModule } from './feature-selection-routing.module';
import { FeatureSelectionFormComponent } from './components/feature-selection-form/feature-selection-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeatureSelectionLayoutComponent, FeatureSelectionFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FeatureSelectionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FeatureSelectionLayoutComponent,
    FeatureSelectionFormComponent,
  ]
})
export class FeatureSelectionModule { }
