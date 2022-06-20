import { Component, OnDestroy } from '@angular/core';
import { User, UserService } from 'app/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PermintaanService } from '../permintaan/permintaan.service';
import { BerandaService, Kategori } from './beranda.service';

@Component({
  selector: 'app-beranda',
  templateUrl: 'beranda.page.html',
})
export class BerandaPage implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  kategori: Kategori[] = this._beranda.kategori;

  user: User; 
  inisial;

  permintaanTerakhir = []; // tambahkan interface Permintaan[];
  isPtLoading = true;

  constructor(
    private _beranda: BerandaService,
    private _permintaan: PermintaanService,
    private _user: UserService
  ) { 
    this._user.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(user => {
      this.user = user;
      if(this.user) this.inisial = this.user.namaLengkap.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
    })
  }

  ionViewDidEnter(){
    this.ambilPermintaanTerakhir();
  }
  
  ambilPermintaanTerakhir(refresher?){
    if(this.permintaanTerakhir?.length < 1) this.isPtLoading = true;
    this._permintaan.permintaan({ size: 3 })
    .subscribe(res => {
      console.log(res);
      this.isPtLoading = false;
      this.permintaanTerakhir = res.permintaan;
      this.permintaanTerakhir = res.permintaan.map(v => ({ 
        ...v, 
        jenis: this._beranda.kategori.find(r => r.kode == v.kategori)?.nama 
      }));
      if(refresher) refresher.target.complete();
    }, err => {
      console.log(err)
      this.isPtLoading = false;
      if(refresher) refresher.target.complete();
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
