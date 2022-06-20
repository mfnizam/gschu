import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BiodataService {

  constructor(
    private _http: HttpClient
  ) { }

  simpan(data): Observable<any> {
    return this._http.post(environment.serverUrl + 'api/akun/ubah', data)
  }
}
