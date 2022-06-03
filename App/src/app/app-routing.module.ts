import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'masuk',
    loadChildren: () => import('./pages/auth/masuk/masuk.module').then( m => m.MasukPageModule)
  },{
    path: 'daftar',
    loadChildren: () => import('./pages/auth/daftar/daftar.module').then( m => m.DaftarPageModule)
  }, {
    path: 'permintaan',
    loadChildren: () => import('./pages/public/permintaan/permintaan.module').then( m => m.PermintaanPageModule)
  },{
    path: '',
    loadChildren: () => import('./pages/public/beranda/beranda.module').then( m => m.BerandaPageModule)
  },{
    path: '**',
    redirectTo: ''
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
