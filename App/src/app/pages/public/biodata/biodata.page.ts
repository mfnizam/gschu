import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from 'app/services/user/user.service';
import { BiodataService } from './biodata.service';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.page.html'
})
export class BiodataPage {

  biodataForm: FormGroup = this._formBuilder.group({
    _id: [this._user.user?._id, [Validators.required]],
    namaLengkap: [{ value: this._user.user?.namaLengkap, disabled: true }, [Validators.required]],
    email   : [{ value: this._user.user?.email, disabled: true }, [Validators.required, Validators.email]],
    noPegawai: [null, [Validators.required]],
    noTlp: [null, [Validators.required]],
    wilayahKerja: [null, [Validators.required]],
    fungsi: [null, [Validators.required]],
    jabatan: [null, [Validators.required]],
  })

  isLoading = false;

  toast;

  constructor(
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _user: UserService,
    private _biodata: BiodataService,
    private _toast: ToastController
  ) {}

  simpan(){
    if(this.biodataForm.invalid) return;
    this.isLoading = true;

    this._biodata.simpan(this.biodataForm.value)
    .subscribe(res => {
      console.log(res)
      this.isLoading = false;
      this._navCtrl.navigateRoot('/', { animationDirection: 'forward' })
    }, async err => {
      console.log(err)
      this.isLoading = false;
      
      if(this.toast) this.toast.dismiss();
      this.toast = await this._toast.create({ 
        message: err.error?.field == 'email'? 'Email sudah terdaftar. Gunakan Email lain.' : 'Terjadi Kesalahan. Coba beberapa saat lagi.', 
        duration: 3000, 
        color: 'danger', 
        mode: 'ios' 
      });
      this.toast.present();
    })
  }
}
