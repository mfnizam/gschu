import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'masuk',
    loadChildren: () => import('./pages/auth/masuk/masuk.module').then( m => m.MasukPageModule)
  },{
    path: 'daftar',
    loadChildren: () => import('./pages/auth/daftar/daftar.module').then( m => m.DaftarPageModule)
  },{
    path: 'sandilupa',
    loadChildren: () => import('./pages/auth/sandilupa/sandilupa.module').then( m => m.SandilupaPageModule)
  },{
    path: 'sandiverifikasi',
    loadChildren: () => import('./pages/auth/sandiverifikasi/sandiverifikasi.module').then( m => m.SandiverifikasiPageModule)
  },{
    path: 'sandibaru',
    loadChildren: () => import('./pages/auth/sandibaru/sandibaru.module').then( m => m.SandibaruPageModule)
  },{
    path: 'sandipemberitahuan',
    loadChildren: () => import('./pages/auth/sandipemberitahuan/sandipemberitahuan.module').then( m => m.SandipemberitahuanPageModule)
  },{
    path: 'biodata',
    loadChildren: () => import('./pages/public/biodata/biodata.module').then( m => m.BiodataPageModule)
  },{
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
