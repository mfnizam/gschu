import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserService } from 'app/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BerandaService } from '../beranda/beranda.service';
import { PermintaanService } from './permintaan.service';

@Component({
  selector: 'app-permintaan',
  templateUrl: './permintaan.page.html'
})
export class PermintaanPage implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  segment = 'menunggu';

  user: User;

  permintaan = [];
  isLoading = true;

  constructor(
    private _permintaan: PermintaanService,
    private _user: UserService,
    private _beranda: BerandaService
  ) {
    this._user.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(user => {
      this.user = user;
    })
    this.ambilPermintaan(null, true);
  }
  
  ambilPermintaan(refresher?, isLoading = false){
    this.isLoading = isLoading;
    this._permintaan.permintaan()
    .subscribe(res => {
      console.log(res);
      setTimeout(_ => { this.isLoading = false }, 2000);
      this.permintaan = res.permintaan.map(v => ({ 
        ...v, 
        jenis: this._beranda.kategori.find(r => r.kode == v.kategori)?.nama 
      }));
      if(refresher) refresher.target.complete();
    }, err => {
      console.log(err)
      this.isLoading = false;
      if(refresher) refresher.target.complete();
    })
  }
  
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
