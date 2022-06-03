import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandiverifikasiPageRoutingModule } from './sandiverifikasi-routing.module';

import { SandiverifikasiPage } from './sandiverifikasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandiverifikasiPageRoutingModule
  ],
  declarations: [SandiverifikasiPage]
})
export class SandiverifikasiPageModule {}
