import { Component, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'app/services/auth/auth.service';
import { User, UserService } from 'app/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.page.html'
})
export class AkunPage implements OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  user: User;

  inisial

  constructor(
    private _navCtrl: NavController,
    private _auth: AuthService,
    private _user: UserService
  ) {
    this._user.user$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe(user => {
      this.user = user;
      if(this.user){
        this.inisial = this.user.namaLengkap.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase()
      }
    })
  }

  keluar(){
    this._auth.keluar();
    this._navCtrl.navigateRoot('/masuk', { animationDirection: 'forward'})
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
