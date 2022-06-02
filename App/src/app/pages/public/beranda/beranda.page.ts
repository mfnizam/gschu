import { Component } from '@angular/core';

@Component({
  selector: 'app-beranda',
  templateUrl: 'beranda.page.html',
})
export class BerandaPage {

  tollbarOpacity = 0;

  menu = [{
    icon: 'home-outline',
    nama: 'Perbaikan RDP & Fasum',
    route: '/permintaan',
    queryParams: {jenis: 'perbaikanRdp'}
  }, {
    icon: 'bag-handle-outline',
    nama: 'Perawatan & Perbaikan AC',
    route: '/permintaan',
    queryParams: {jenis: 'perbaikanAc'}
  }, {
    icon: 'beer-outline',
    nama: 'Alat Tulis Kantor',
    route: '/permintaan',
    queryParams: {jenis: 'alatTulis'}
  }, {
    icon: 'briefcase-outline',
    nama: 'Furniture & Perabotan',
    route: '/permintaan',
    queryParams: {jenis: 'furniture'}
  }, {
    icon: 'cart-outline',
    nama: 'Snack & Makanan Berat',
    route: '/permintaan',
    queryParams: {jenis: 'makanan'}
  }, {
    icon: 'desktop-outline',
    nama: 'Potong Rumput / Tebang Pohon',
    route: '/permintaan',
    queryParams: {jenis: 'potongRumput'}
  }, {
    icon: 'flower-outline',
    nama: 'Mess / Penginapan',
    route: '/permintaan',
    queryParams: {jenis: 'penginapan'}
  }, {
    icon: 'football-outline',
    nama: 'Kendaraan Ringan Penumpang',
    route: '/permintaan',
    queryParams: {jenis: 'kendaraan'}
  }]
  constructor() {}

  scroll(val){
    val = val.detail?.scrollTop || 0;
    if(val > 100) return this.tollbarOpacity = 1;
    this.tollbarOpacity = Number((val / 100).toFixed(2));
  }

}
