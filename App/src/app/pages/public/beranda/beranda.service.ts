import { Injectable } from '@angular/core';

export interface Kategori {
  kode: string;
  nama: string;
} 

@Injectable({
  providedIn: 'root'
})
export class BerandaService {

  public kategori: Kategori[] = [{
    kode: 'rdp',
    nama: 'Perbaikan RDP & Fasum'
  }, {
    kode: 'furniture',
    nama: 'Permintaan \nFurniture'
  }, {
    kode: 'rumput',
    nama: 'Potong Rumput / Tebang Pohon'
  }, {
    kode: 'ac',
    nama: 'Perawatan & Perbaikan AC'
  }, {
    kode: 'atk',
    nama: 'Alat Tulis \nKantor'
  }, {
    kode: 'snack',
    nama: 'Snack & Makanan Berat'
  }, {
    kode: 'krp',
    nama: 'Kend. Ringan Penumpang'
  }, {
    kode: 'mess',
    nama: 'Mess / \nPenginapan'
  }, {
    kode: 'dokumen',
    nama: 'Pengiriman \nDokumen'
  }, {
    kode: 'galon',
    nama: 'Air Mineral \n(Galon)'
  }, {
    kode: 'acara',
    nama: 'Penyiapan \nAcara'
  }, {
    kode: 'peralatan',
    nama: 'Peralatan (Lampu & Kebersihan)'
  }]
  
  constructor() { }
}
