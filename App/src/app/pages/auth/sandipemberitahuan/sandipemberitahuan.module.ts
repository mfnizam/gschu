import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandipemberitahuanPageRoutingModule } from './sandipemberitahuan-routing.module';

import { SandipemberitahuanPage } from './sandipemberitahuan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandipemberitahuanPageRoutingModule
  ],
  declarations: [SandipemberitahuanPage]
})
export class SandipemberitahuanPageModule {}
