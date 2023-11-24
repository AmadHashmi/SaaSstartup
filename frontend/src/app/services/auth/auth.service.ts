import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../../model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';
export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = env.apiURL;
  private userSubject = new BehaviorSubject<User | null>(null);

  // Observable to which components can subscribe to get updates on user changes
  user$ = this.userSubject.asObservable();
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    if (this.getUserInfo()) {
      this.userSubject.next(this.getUserInfo());
    } else {
      return;
    }
  }

  login(loginForm: LoginForm) {
    return this.http
      .post<any>(`${this.api}` + '/api/users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          localStorage.setItem(JWT_NAME, token.access_token);
          this.userSubject.next(this.getUserInfo());
          return token;
        })
      );
  }

  register(user: User) {
    return this.http.post<any>(`${this.api}` + '/api/users', user);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserInfo(): User {
    const token = localStorage.getItem(JWT_NAME);
    let payload: string;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload).user;
    } else {
      return null as any;
    }
  }

  logout() {
    localStorage.removeItem(JWT_NAME);
    this.userSubject.next(null);
    this.router.navigate(['login']);
  }
}
