import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandilupaPageRoutingModule } from './sandilupa-routing.module';

import { SandilupaPage } from './sandilupa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandilupaPageRoutingModule
  ],
  declarations: [SandilupaPage]
})
export class SandilupaPageModule {}
