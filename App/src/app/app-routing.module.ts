import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, NonAuthGuard } from './services/auth/auth.guard';

const routes: Routes = [ 
  {
    path: 'masuk',
    loadChildren: () => import('./pages/auth/masuk/masuk.module').then( m => m.MasukPageModule),
    canActivate: [NonAuthGuard],
  },{
    path: 'daftar',
    loadChildren: () => import('./pages/auth/daftar/daftar.module').then( m => m.DaftarPageModule),
    canActivate: [NonAuthGuard],
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
    loadChildren: () => import('./pages/public/biodata/biodata.module').then( m => m.BiodataPageModule),
    canActivate: [AuthGuard],
  },{
    path: 'form/:kategori',
    loadChildren: () => import('./pages/public/form/form.module').then( m => m.FormPageModule),
    canActivate: [AuthGuard],
  },{
    path: 'notifikasi',
    loadChildren: () => import('./pages/public/notifikasi/notifikasi.module').then( m => m.NotifikasiPageModule),
    canActivate: [AuthGuard],
  },{
    path: 'permintaan',
    loadChildren: () => import('./pages/public/permintaan/permintaan.module').then( m => m.PermintaanPageModule),
    canActivate: [AuthGuard],
  },{
    path: 'akun',
    loadChildren: () => import('./pages/public/akun/akun.module').then( m => m.AkunPageModule),
    canActivate: [AuthGuard],
  },{
    path: 'detail/:id',
    loadChildren: () => import('./pages/public/detail/detail.module').then( m => m.DetailPageModule),
    canActivate: [AuthGuard],
  },{
    path: 'ulasan',
    loadChildren: () => import('./pages/public/ulasan/ulasan.module').then( m => m.UlasanPageModule),
    canActivate: [AuthGuard],
  },{
    path: '',
    loadChildren: () => import('./pages/public/beranda/beranda.module').then( m => m.BerandaPageModule),
    canActivate: [AuthGuard],
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
