import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandilupaPage } from './sandilupa.page';

const routes: Routes = [
  {
    path: '',
    component: SandilupaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandilupaPageRoutingModule {}
