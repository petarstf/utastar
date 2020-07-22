import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeatureSelectionLayoutComponent } from './components/feature-selection-layout/feature-selection-layout.component';
import { FormGuard } from 'src/app/shared/guards/form.guard';
import { MetadataComponent } from './components/metadata/metadata.component';
import { CriteriaComponent } from './components/criteria/criteria.component';
import { AlternativesComponent } from './components/alterantives/alternatives.component';
import { MulticriteriaComponent } from './components/multicriteria/multicriteria.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureSelectionLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'criteria',
        pathMatch: 'full',
      },
      {
        path: 'criteria',
        component: CriteriaComponent,
      },
      {
        path: 'alternatives',
        component: AlternativesComponent,
        canActivate: [FormGuard],
      },
      {
        path: 'multicriteria-table',
        component: MulticriteriaComponent,
        canActivate: [FormGuard],
      },
      {
        path: 'metadata',
        component: MetadataComponent,
        canActivate: [FormGuard]
      }
    ]
  },

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureSelectionRoutingModule { }
