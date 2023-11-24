import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../model/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';
export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'token';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api = 'http://localhost:3000';
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>(`${this.api}` + '/api/users/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log('token' + token.access_token);
          localStorage.setItem(JWT_NAME, token.access_token);
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
}
