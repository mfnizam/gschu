import { Component } from '@angular/core';
import { NotifikasiService } from './notifikasi.service';

@Component({
  selector: 'app-notifikasi',
  templateUrl: './notifikasi.page.html'
})
export class NotifikasiPage {

  notifikasi = [];

  isLoading = false;

  constructor(
    private _notifikasi: NotifikasiService
  ) {}
  
  ionViewDidEnter(){
    this.ambilNotifikasi();
  }

  ambilNotifikasi(refresher?){
    this.isLoading = true;
    this._notifikasi.notifikasi()
    .subscribe(res => {
      console.log(res);
      this.isLoading = false;
      if(refresher) refresher.target.complete();
    }, err => {
      console.log(err)
      this.isLoading = false;
      if(refresher) refresher.target.complete();
    })
  }
}
