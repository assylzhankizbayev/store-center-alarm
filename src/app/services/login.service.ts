import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject<string | null>(this.user);
  url = environment.host;

  constructor(
    private http: HttpClient
  ) {}

  get isLoggedIn() {
    return this.isLoggedIn$.value;
  }

  get user() {
    const userPhone = localStorage.getItem('userPhone');

    if (userPhone) {
      this.isLoggedIn$.next(true);
    }

    return userPhone;
  }

  login(user: IUser) {
    return this.http.post(this.url + '/users/login', user).pipe(
      tap(() => {
        localStorage.setItem('userPhone', user.phone);
        localStorage.setItem('isLoggedIn', 'true');

        this.user$.next(user.phone);
        this.isLoggedIn$.next(true);
      })
    );
  }
}
