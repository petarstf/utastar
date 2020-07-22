import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { FeatureSelectionLayoutComponent } from './components/feature-selection-layout/feature-selection-layout.component';
import { FeatureSelectionRoutingModule } from './feature-selection-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { MetadataComponent } from './components/metadata/metadata.component';
import { CriteriaComponent } from './components/criteria/criteria.component';
import { MulticriteriaComponent } from './components/multicriteria/multicriteria.component';
import { AlternativesComponent } from './components/alterantives/alternatives.component';

@NgModule({
  declarations: [
    FeatureSelectionLayoutComponent,
    CriteriaComponent,
    MulticriteriaComponent,
    AlternativesComponent,
    MetadataComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FeatureSelectionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SatPopoverModule,
  ],
  exports: [
    FeatureSelectionLayoutComponent,
    CriteriaComponent,

  ]
})
export class FeatureSelectionModule { }
