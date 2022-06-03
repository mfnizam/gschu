import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandibaruPage } from './sandibaru.page';

const routes: Routes = [
  {
    path: '',
    component: SandibaruPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandibaruPageRoutingModule {}
