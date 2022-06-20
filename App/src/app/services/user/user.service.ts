import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export class User {
  _id           : string;
	namaLengkap		: string;
  email 				: string;
	kodeNoTlp 		: string;
	noTlp 				: string;
	noPegawai			: number;
	jabatan 			: string;
	wilayahKerja	: string;
	fungsi  			: string;
	foto         ?: string;
  tokenNotif   ?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  set user(value: User) { this._user.next(value); }
  get user$(): Observable<User>{ return this._user.asObservable(); }
  get user(): User { return this._user.getValue() }

  constructor() { }
}
