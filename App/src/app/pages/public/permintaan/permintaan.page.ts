import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-permintaan',
  templateUrl: 'permintaan.page.html',
})
export class PermintaanPage {
  
  permintaanForm: FormGroup = this._formBuilder.group({
    kantor          : [null, [Validators.required]],
    nama            : [null, [Validators.required]],
    kontak          : [null, [Validators.required]],
    jabatan         : [null, [Validators.required]],
    fungsi          : [null, [Validators.required]],
    alamatRdp       : [null, [Validators.required]],
    jenisPerbaikan  : [null, [Validators.required]],
    keterangan      : [null, [Validators.required]]
  })

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  kirim(){
    
  }

}
