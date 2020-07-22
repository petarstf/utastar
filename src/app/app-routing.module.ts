import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewLayoutComponent } from './modules/overview/components/overview-layout/overview-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'table-creation',
    loadChildren: () => import('./modules/feature-selection/feature-selection.module').then(m => m.FeatureSelectionModule)
  },
  {
    path: 'overview',
    component: OverviewLayoutComponent,
    loadChildren: () => import('./modules/overview/overview.module').then(m => m.OverviewModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
