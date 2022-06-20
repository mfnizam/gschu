import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { UserService } from 'app/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BerandaService, Kategori } from '../beranda/beranda.service';
import { FormService } from './form.service';

@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
})
export class FormPage implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  kategori: Kategori;
  title;
  titleColor;

  userForm: FormGroup = this._formBuilder.group({
    _id         : [{ value: this._user.user?._id }, [Validators.required]],
    namaLengkap : [{ value: this._user.user?.namaLengkap, disabled: true }, [Validators.required]],
    email       : [{ value: this._user.user?.email, disabled: true }, [Validators.required]],
    noPegawai   : [{ value: this._user.user?.noPegawai, disabled: true }, [Validators.required]],
    kodeNoTlp   : [{ value: this._user.user?.kodeNoTlp, disabled: true }, [Validators.required]],
    noTlp       : [{ value: this._user.user?.noTlp, disabled: true }, [Validators.required]],
  })

  permintaanForm: FormGroup = this._formBuilder.group({});
  minTgl = new Date().toLocaleString('sv').replace(' ', 'T');
  fcmTgl = 'tgl';
  titleTgl = 'Pilih Tanggal ';
  fcmTglVariasi = 'tgl';
  iVariasiModal = 0;
  titleTglVariasi = 'Pilih Tanggal';
  valueWaktu = this.minTgl;
  fcmWaktu = 'waktu';
  titleWaktu = 'Pilih Waktu ';
  showWaktu = false;

  isLoading = false;

  toast;

  constructor(
    private _route: ActivatedRoute,
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _beranda: BerandaService,
    private _form: FormService,
    private _user: UserService,
    private _alert: AlertController,
    private _loading: LoadingController,
    private _toast: ToastController
  ) {
    this._route.params
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(params => {
      this.kategori = this._beranda.kategori.find(v => v.kode == params.kategori);
      this.initPermintaanForm();
    })
  }

  initPermintaanForm(){
    if(
      this.kategori.kode == 'rdp' || 
      this.kategori.kode == 'furniture' || 
      this.kategori.kode == 'rumput' || 
      this.kategori.kode == 'ac' ||
      this.kategori.kode == 'atk' ||
      this.kategori.kode == 'peralatan'
    ) {
      this.permintaanForm = this._formBuilder.group({
        alamat        : ['Test Alamat ' + this.kategori.nama, [Validators.required]],
        tgl           : [this.minTgl, [Validators.required]],
        variasi       : this._formBuilder.array([this.variasi()]),
        catatan       : [null],
      })
    }else if(this.kategori.kode == 'snack'){
      this.permintaanForm = this._formBuilder.group({
        judul         : ['Rapat besar', [Validators.required]],
        tempat        : [null, [Validators.required]],
        jumlah        : [null, [Validators.required]],
        tgl           : [this.minTgl, [Validators.required]],
        pengambilan   : [null, [Validators.required]],
        perihal       : [[], [Validators.required]],
        costCenter    : [null],
        GLAccount     : [null],
        pic           : [null],
        catatan       : [null],
      })
    }else if(this.kategori.kode == 'krp'){
      this.permintaanForm = this._formBuilder.group({
        tglKeberangkatan  : [this.minTgl, [Validators.required]],
        tglKembali        : [this.minTgl, [Validators.required]],
        tempatTujuan      : [null, [Validators.required]],
        tempatPenjemputan : [null, [Validators.required]],
        waktuPenjemputan  : [this.minTgl, [Validators.required]],
        jumlahPenumpang   : [null, [Validators.required]],
        jenisPelayanan    : [null, [Validators.required]],
        catatan           : [null],
      })
    }else if(this.kategori.kode == 'mess'){
      this.permintaanForm = this._formBuilder.group({
        penanggungJawab   : [null, [Validators.required]],
        checkIn           : [this.minTgl, [Validators.required]],
        checkOut          : [this.minTgl, [Validators.required]],
        jumlahTamu        : [null, [Validators.required]],
        jumlahKamar       : [null, [Validators.required]],
        catatan           : [null]
      })
    }else if(this.kategori.kode == 'dokumen'){
      this.permintaanForm = this._formBuilder.group({
        tglPengiriman     : [null, [Validators.required]],
        namaPengirim      : [null, [Validators.required]],
        alamatPengirim    : [null, [Validators.required]],
        noTlpPengirim     : [null, [Validators.required]],
        namaPenerima      : [null, [Validators.required]],
        alamatPenerima    : [null, [Validators.required]],
        noTlpPenerima     : [null, [Validators.required]],
        jenisDokumen      : [null, [Validators.required]],
        catatan           : [null],
      })
    }else if(this.kategori.kode == 'galon'){
      this.permintaanForm = this._formBuilder.group({
        jumlah            : [null, [Validators.required]],
        lokasi            : [null, [Validators.required]],
        tgl               : [null, [Validators.required]],
        waktu             : [null, [Validators.required]],
        jenisPelayanan    : [null, [Validators.required]],
        catatan           : [null],
      })
    }else if(this.kategori.kode == 'acara'){
      this.permintaanForm = this._formBuilder.group({
        nama              : [null, [Validators.required]],
        jenis             : [null, [Validators.required]],
        costCenter        : [null],
        GLAccount         : [null],
        tgl               : [this.minTgl, [Validators.required]],
        waktu             : [this.minTgl, [Validators.required]],
        tempat            : [null, [Validators.required]],
        jumlah            : [null, [Validators.required]],
        pic               : [null, [Validators.required]],
        noTlpPic          : [null, [Validators.required]],
        variasi           : this._formBuilder.array([this.variasi()]),
        catatan           : [null],
      })
    }
  }

  variasi(){
    let group: FormGroup;
    if(this.kategori.kode == 'rdp' || this.kategori.kode == 'ac'){
      group = this._formBuilder.group({
        jenis       : [null, [Validators.required]],
        foto        : [null],
      })
    } else if (this.kategori.kode == 'furniture' || this.kategori.kode == 'atk' || this.kategori.kode == 'peralatan'){
      group = this._formBuilder.group({
        nama        : [null, [Validators.required]],
        jumlah      : [null, [Validators.required]],
        satuan      : [null, [Validators.required]],
      })
    }else if(this.kategori.kode == 'rumput'){
      group = this._formBuilder.group({
        lokasi      : [null, [Validators.required]],
        foto        : [null]
      })
    }else if(this.kategori.kode == 'acara'){
      group = this._formBuilder.group({
        nama        : [null, [Validators.required]],
        jumlah      : [null, [Validators.required]],
        tgl         : [this.minTgl, [Validators.required]],
      })
    }
    return group;
  }

  tambahVariasi(){
    (this.permintaanForm.get('variasi') as FormArray).push(this.variasi())
  }

  async hapusVariasi(i){
    let alert = await this._alert.create({
      message: 'Apakah anda yakin ingin menghapus Variasi Perbaikan ini?',
      mode: 'ios',
      cssClass: 'item-' + this.kategori.kode,
      buttons: [{ text: 'Batal', role: 'cancel'}, { text: 'Hapus', role: 'ok'}]
    });
    await alert.present();
    let { role } = await alert.onDidDismiss();
    if(role == 'ok') (this.permintaanForm.get('variasi') as FormArray).removeAt(i)
  }

  pilihPerihal(e){
    console.log(e.detail);
    let perihal = this.permintaanForm.get('perihal');
    if(e.detail.checked){
      perihal.setValue([...perihal.value, e.detail.value])
    }else {
      perihal.value.splice(perihal.value.indexOf(e.detail.value), 1)
    }
  }

  bukaTgl(modal, title?, fcmTglName?){
    if(title) this.titleTgl = 'Pilih Tanggal ' + title;
    if(fcmTglName) this.fcmTgl = fcmTglName;
    modal.present();
  }
  bukaTglVariasi(modal, title, i, fcmTglName){
    this.iVariasiModal = i;
    if(title) this.titleTglVariasi = 'Pilih Tanggal ' + title;
    if(fcmTglName) this.fcmTglVariasi = fcmTglName;
    modal.present();
  }
  pilihVariasiTgl(modal, tgl){
    console.log(tgl.value)
    this.permintaanForm.get('variasi')['controls'][this.iVariasiModal].get(this.fcmTglVariasi).setValue(tgl.value)
    modal.dismiss();
  }
  bukaWaktu(modal, title?, fcmWaktuName = 'waktu'){
    if(title) this.titleWaktu = 'Pilih Waktu ' + title;
    if(fcmWaktuName) this.fcmWaktu = fcmWaktuName;
    this.valueWaktu = this.permintaanForm.get(fcmWaktuName).value;
    modal.present();
    setTimeout(_ => { this.showWaktu = true; }, 100)
  }
  dismissWaktu(){ this.showWaktu = false; }
  pilihWaktu(modal){ 
    modal.dismiss(); 
    this.permintaanForm.get(this.fcmWaktu).setValue(this.valueWaktu);
  }

  bukaKonfirmasi(modal){
    // console.log(this.permintaanForm.value)
    if(this.permintaanForm.invalid) return;
    modal.present();
  }

  async kirim(modal){
    if(this.permintaanForm.invalid) return;
    this.isLoading = true;
    
    
    let loading = await this._loading.create({ 
      message: 'Mengirim permintaan anda...',
      mode: 'ios',
      backdropDismiss: false
    });
    await modal.dismiss();
    await loading.present();
    
    let value = this.permintaanForm.value
    if(this.kategori.kode == 'rdp' || this.kategori.kode == 'ac') delete Object.assign(value, {['perbaikan']: value['variasi'] })['variasi'];
    else if(this.kategori.kode == 'furniture') delete Object.assign(value, {['furniture']: value['variasi'] })['variasi'];
    else if(this.kategori.kode == 'rumput') delete Object.assign(value, {['pemotongan']: value['variasi'] })['variasi'];
    else if(this.kategori.kode == 'atk') delete Object.assign(value, {['atk']: value['variasi'] })['variasi'];
    else if(this.kategori.kode == 'acara') delete Object.assign(value, {['kebutuhan']: value['variasi'] })['variasi'];
    else if(this.kategori.kode == 'peralatan') delete Object.assign(value, {['peralatan']: value['variasi'] })['variasi'];

    this._form.kirim(value, this.kategori.kode)
    .subscribe(res => {
      console.log(res);
      this.isLoading = false;
      loading.dismiss();
      this._navCtrl.navigateForward(['/permintaan'], { replaceUrl: true })
    }, async err => {
      console.log(err)
      this.isLoading = false;
      loading.dismiss();

      if(this.toast) this.toast.dismiss();
      this.toast = await this._toast.create({ 
        message: 'Gagal mengirim permintaan. Coba beberapa saat lagi', 
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
