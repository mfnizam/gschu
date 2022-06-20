import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-masuk',
  templateUrl: './masuk.page.html'
})
export class MasukPage {

  masukForm: FormGroup = this._formBuilder.group({
    email   : [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
  })
  showPassword = false;

  isLoading = false;

  constructor(
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder,
    private _auth: AuthService) { }

  masuk(){
    if(this.masukForm.invalid) return;
    this.isLoading = true;

    this._auth.masuk(this.masukForm.value)
    .subscribe(res => {
      console.log(res)
      this.isLoading = false;
      this._navCtrl.navigateRoot(['/'], { animationDirection: 'forward'})
    }, err => {
      console.log(err)
      this.isLoading = false;
      if(err.error?.field == 'email' || err.error?.field == 'password' ) this.masukForm.setErrors({ emailsandiInvalid: true })
      console.log(this.masukForm)
    })
  }
}
