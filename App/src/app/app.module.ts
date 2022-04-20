import { NgModule } from '@angular/core';
import { RouteReuseStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: 'permintaan',
    loadChildren: () => import('./permintaan/permintaan.module').then( m => m.PermintaanPageModule)
  },{
    path: '',
    loadChildren: () => import('./beranda/beranda.module').then( m => m.BerandaPageModule)
  },{
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot({
      // mode: 'ios'
    }), 
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
