import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Routes, RouterModule } from '@angular/router';

import { SandipemberitahuanPage } from './sandipemberitahuan.page';

const routes: Routes = [{ path: '', component: SandipemberitahuanPage }];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SandipemberitahuanPage]
})
export class SandipemberitahuanPageModule {}
