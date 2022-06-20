import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from 'app/services/auth/auth.service';
import { AuthUtils } from 'app/services/auth/auth.utils';
import { AlertController, NavController } from '@ionic/angular';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _authService: AuthService,
    private _alert: AlertController,
    private _navCtrl: NavController,
    ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this._authService.getAccessToken())
    .pipe(switchMap(accessToken => {
      let newReq = req.clone();
      if(accessToken && !AuthUtils.isTokenExpired(accessToken)) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', 'JWT ' + accessToken)
        });
      }

      return next.handle(newReq)
      .pipe(
        catchError((response) => {
          if(response instanceof HttpErrorResponse && response.status === 401) {
            // this._authService.keluar().subscribe();
            console.log(response)
            this._authService.keluar()
            this._navCtrl.navigateRoot(['/masuk'], { animationDirection: 'forward' })
            
            // this._alert.create({
            //   header: 'Akses Ditolak',
            //   message: 'Anda tidak memiliki akses pada halaman ini. Mohon masuk kembali.',
            //   mode: 'ios',
            //   cssClass: 'alert-danger',
            //   buttons: [{ text: 'Tutup', role: 'cancel'}]
            // }).then(v => {
            //   v.present();
            //   v.onDidDismiss().then(v => {
            //     this._navCtrl.navigateRoot(['/masuk'], { animationDirection: 'forward' })
            //   })
            // })
          }
          return throwError(response);
        })
        );
    }))
    
  }
}
