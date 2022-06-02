import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasukPage } from './masuk.page';

const routes: Routes = [
  {
    path: '',
    component: MasukPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasukPageRoutingModule {}
