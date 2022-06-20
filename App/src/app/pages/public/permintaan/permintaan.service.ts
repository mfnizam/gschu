import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermintaanService {

  constructor(
    private _http: HttpClient
  ) { }

  permintaan(opsi = {}): Observable<any> {
    return this._http.get(environment.serverUrl + 'api/public/permintaan', { params: opsi })
  }

  detail(_id): Observable<any> {
    return this._http.get(environment.serverUrl + 'api/public/permintaan/detail', { params: { _id }})
  }
}
