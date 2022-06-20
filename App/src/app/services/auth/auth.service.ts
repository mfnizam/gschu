import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { UserService } from 'app/services/user/user.service';
import { AuthUtils } from 'app/services/auth/auth.utils';
import { StorageService } from 'app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _authenticated: boolean = false;
  
  constructor(
    private _http: HttpClient,
    private _user: UserService,
    private _storage: StorageService
  ) { }

  setAccessToken(token: string): Promise<any> { return this._storage.set('accessToken', token) }
  getAccessToken(): Promise<any> { return this._storage.get('accessToken') }

  masuk(credentials: { email: string; password: string }): Observable<any> {
    // if ( this._authenticated ) return throwError('User is already logged in.');
    return this._http.post(environment.serverUrl + 'api/auth/masuk', credentials).pipe(
      switchMap((response: any) => {
        let userDecode = AuthUtils._decodeToken(response.accessToken);
        if(response.success && response.accessToken){
          this.setAccessToken(response.accessToken)
          this._authenticated = true;
          this._user.user = userDecode;
          return of(true);
        }
        return of(false);
      }));
  }

  daftar(user: { namaLengkap: string; email: string; password: string; }): Observable<any> {
    return this._http.post(environment.serverUrl + 'api/auth/daftar', user)
    .pipe(
      switchMap((response: any) => {
        console.log(response)
        if(response.success && response.accessToken){
          // this.accessToken = response.accessToken;
          this.setAccessToken(response.accessToken);
          this._authenticated = true;
          this._user.user = AuthUtils._decodeToken(response.accessToken);
          return of(true)
        }
        return of(false);
      })
      );
  }

  async keluar() {
    await this._storage.remove('accessToken');
    // await this._storage.remove('tokenNotif');
    
    this._authenticated = false;
    this._user.user = null;
  }
  
  // keluar(): Observable<any> {
  //   return from(this._storage.get('tokenNotif'))
  //   .pipe(switchMap(token => {
  //     console.log(token)
  //     if(token) this.tokenNotifHapus(token).subscribe();
  //     this._storage.remove('accessToken');
  //     this._storage.remove('tokenNotif');
  //     this._authenticated = false;
  //     this._user.user = null;
  //     return of(true);
  //   }))
  // }

  signInUsingToken(): Observable<any> {
    return this._http.get(environment.serverUrl + 'api/auth/refresh-access-token')
    .pipe(
      catchError(() => of(false)),
      switchMap((response: any) => {
        if(response.success && response.accessToken){
          this.setAccessToken(response.accessToken)
          this._authenticated = true;
          this._user.user = AuthUtils._decodeToken(response.accessToken);
          return of(true);
        }
        return of(false)
      }));
  }

  authCheck(): Observable<boolean> {
    return from(this.getAccessToken())
    .pipe(switchMap(accessToken => {
      if (!accessToken) return of(false);
      if (AuthUtils.isTokenExpired(accessToken)) return of(false);
      // if (!AuthUtils._decodeToken(accessToken)) return of(false);
      return this.signInUsingToken();
    }))
  }

  nonAuthCheck(){
    return from(this.getAccessToken())
    .pipe(switchMap(accessToken => {
      if (!accessToken) return of(false);
      if (AuthUtils.isTokenExpired(accessToken)) return of(false);
      return of(true);
    }))
  }

  tokenNotifSimpan(tokenNotif): Observable<any>{
    return this._http.post<any>(environment.serverUrl + 'api/akun/tokennotif/simpan', { tokenNotif })
  }
  tokenNotifHapus(tokenNotif): Observable<any>{
    return this._http.post<any>(environment.serverUrl + 'api/akun/tokennotif/hapus', { tokenNotif })
  }
}
