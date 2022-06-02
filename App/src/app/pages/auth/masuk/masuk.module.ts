import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MasukPageRoutingModule } from './masuk-routing.module';

import { MasukPage } from './masuk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MasukPageRoutingModule
  ],
  declarations: [MasukPage]
})
export class MasukPageModule {}
