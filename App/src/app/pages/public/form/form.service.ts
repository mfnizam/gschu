import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private _http: HttpClient
  ) { }

  kirim(permintaan, kategori): Observable<any> {
    return this._http.post(environment.serverUrl + 'api/public/permintaan/tambah/' + kategori, permintaan)
  }
}
