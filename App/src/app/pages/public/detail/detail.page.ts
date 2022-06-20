import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User, UserService } from 'app/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BerandaService, Kategori } from '../beranda/beranda.service';
import { PermintaanService } from '../permintaan/permintaan.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html'
})
export class DetailPage  implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  user: User = {} as User;
  inisial;

  idPermintaan;
  permintaan/* : Permintaan */;

  isLoading = false;
  toast;

  kategori: Kategori = { 
    kode: 'peralatan',
    nama: 'Peralatan (Lampu & Kebersihan)'
  } as Kategori;

  constructor(
    private _route: ActivatedRoute,
    private _user: UserService,
    private _permintaan: PermintaanService,
    private _beranda: BerandaService,
    private _toast: ToastController
  ) {
    this._route.params
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(params => {
      console.log(params)
      this.idPermintaan = params.id;
    })

    this._user.user$
    .subscribe(user => {
      this.user = user;
      if(user) this.inisial = this.user.namaLengkap.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
    })
  }

  ionViewDidEnter(){
    this.ambilPermintaan()
  }
  
  ambilPermintaan(){
    this.isLoading = true;
    this._permintaan.detail(this.idPermintaan)
    .subscribe(res => {
      console.log(res)
      this.isLoading = false;
      this.permintaan = res.permintaan
      this.permintaan.nama = this._beranda.kategori.find(v => v.kode == res.permintaan?.kategori)?.nama
      if(this.permintaan.kategori == 'snack'){
        let perihal = this.permintaan.permintaan.perihal
        this.permintaan.permintaan.perihal = perihal.length > 2 ? perihal.slice(0,-1).join(', ') + ' & ' + perihal.slice(-1) : perihal.join(' & ');
      }
    }, async err => {
      console.log(err)
      this.isLoading = false;

      if(this.toast) this.toast.dismiss();
      this.toast = await this._toast.create({ 
        message: 'Gagal memuat data permintaan. Coba beberapa saat lagi', 
        duration: 3000, 
        color: 'danger', 
        mode: 'ios' ,
        buttons: [{ icon: 'close' }]
      });
      this.toast.present();
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
