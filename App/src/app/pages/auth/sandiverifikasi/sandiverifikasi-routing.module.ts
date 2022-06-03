import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandiverifikasiPage } from './sandiverifikasi.page';

const routes: Routes = [
  {
    path: '',
    component: SandiverifikasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandiverifikasiPageRoutingModule {}
