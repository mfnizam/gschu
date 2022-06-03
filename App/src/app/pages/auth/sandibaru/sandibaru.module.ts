import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandibaruPageRoutingModule } from './sandibaru-routing.module';

import { SandibaruPage } from './sandibaru.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandibaruPageRoutingModule
  ],
  declarations: [SandibaruPage]
})
export class SandibaruPageModule {}
