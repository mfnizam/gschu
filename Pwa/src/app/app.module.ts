import { NgModule } from '@angular/core';
import { RouteReuseStrategy, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { pageTransition } from 'app/animation';

import { ReactiveFormsModule } from '@angular/forms';

import { BerandaPage } from './beranda/beranda.page';
// import { PermintaanPage } from './permintaan/permintaan.page';

const routes: Routes = [
  {
    path: 'permintaan',
    // component: PermintaanPage
    loadChildren: () => import('./permintaan/permintaan.module').then( m => m.PermintaanPageModule)
  },{
    path: '',
    component: BerandaPage
    // loadChildren: () => import('./beranda/beranda.module').then( m => m.BerandaPageModule)
  },{
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  declarations: [
    AppComponent,
    BerandaPage,
    // PermintaanPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({
      // mode: 'ios',
      navAnimation: pageTransition
    }), 
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    environment.production && environment.platform === 'pwa'?
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true, registrationStrategy: 'registerWhenStable:30000'
    }) : [],
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
