import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

import { jabatan } from './jabatan';

import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-permintaan',
  templateUrl: 'permintaan.page.html',
})
export class PermintaanPage implements OnDestroy{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  permintaanForm: FormGroup = this._formBuilder.group({
    wilayahKerja    : [null, [Validators.required]],
    nama            : [null, [Validators.required]],
    kontak          : [null, [Validators.required]],
    jabatan         : [null, [Validators.required]],
    idJabatan       : [null, [Validators.required]],
    fungsi          : [null, [this.validFungsi()]],
    alamatRdp       : [null, [Validators.required]],
    jenisPerbaikan  : [null, [Validators.required]],
    keterangan      : [null, [Validators.required]]
  })

  validFungsi(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => 
      this.dataFungsi?.find(v => v.id == control.value)? null : { nikInvalid: true };
  }

  dataJabatan = []; 
  acDataJabatan = [];

  dataFungsi = [
    {id: 'FM', nama: 'FM', alias: 'FM'},
    {id: 'PO', nama: 'PO', alias: 'PO'},
    {id: 'PE', nama: 'PE', alias: 'PE'},
    {id: 'WS', nama: 'WS', alias: 'WS'},
    {id: 'RAM', nama: 'RAM', alias: 'RAM'},
    {id: 'HSSE', nama: 'HSSE', alias: 'HSSE'},
    {id: 'Finance', nama: 'Finance', alias: 'Finance'},
    {id: 'SCM', nama: 'SCM', alias: 'SCM'},
    {id: 'LR', nama: 'LR', alias: 'LR'},
    {id: 'HC', nama: 'HC', alias: 'HC'},
  ]
  acDataFungsi = this.dataFungsi;


  constructor(
    private _formBuilder: FormBuilder,
    private _toast: ToastController
  ) {
    
    this.permintaanForm.get('wilayahKerja').valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(val => {
      this.dataJabatan = val? jabatan[val] : []
      this.acDataJabatan = this.dataJabatan.length > 0? this.dataJabatan.slice(0,4) : []
    })

    this.permintaanForm.get('jabatan').valueChanges
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(val => {
      console.log(val)
      this.acDataJabatan = this.dataJabatan.filter(v => v.nama.toLowerCase().includes(val.toLowerCase())).slice(0,4);
    })

    this.getFromStorage();
  }

  async getFromStorage(){
    const { value } = await Storage.get({ key: 'nama' });
    console.log(value);
    // this.permintaanForm.get('nama').setValue(nama)
  }

  ngOnDestroy(): void {
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
  }

  pilihJabatan(id, val){
    this.permintaanForm.get('idJabatan').setValue(id)
    this.permintaanForm.get('jabatan').setValue(val)
  }

  pilihFungsi(id){
    this.permintaanForm.get('fungsi').setValue(id)
  }

  kirim(permintaan){
    // return this._toast.create()
    this.setStorage(permintaan.nama);
  }

  async setStorage(value){
    await Storage.set({ key: 'nama', value });
  }

}
