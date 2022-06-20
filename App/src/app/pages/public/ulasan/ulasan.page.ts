import { Component } from '@angular/core';
import { Kategori } from '../beranda/beranda.service';

@Component({
  selector: 'app-ulasan',
  templateUrl: './ulasan.page.html'
})
export class UlasanPage {

  kategori: Kategori = {
    kode: 'ac',
    nama: 'Perawatan & Perbaikan AC'
  }
  constructor() { }
}
