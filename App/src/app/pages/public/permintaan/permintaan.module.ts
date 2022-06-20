import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { Routes, RouterModule } from '@angular/router';

import { PermintaanPage } from './permintaan.page';

const routes: Routes = [{ path: '', component: PermintaanPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PermintaanPage]
})
export class PermintaanPageModule {}
