import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    phone: [null],
    password: [null],
  });
  destroy$ = new Subject();
  error = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login() {
    this.loginService
      .login(this.form.value)
      .pipe(
        tap(() => this.router.navigate(['/home'])),
        catchError((err) => {
          this.error = true;
          return of(err);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
