import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandipemberitahuanPage } from './sandipemberitahuan.page';

const routes: Routes = [
  {
    path: '',
    component: SandipemberitahuanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandipemberitahuanPageRoutingModule {}
