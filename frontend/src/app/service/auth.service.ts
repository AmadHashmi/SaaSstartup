import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<any>('http://localhost:3000/api/users/login', {
        email,
        password,
      })
      .pipe(
        map((token) => {
          console.log('token' + token.access_token);
          localStorage.setItem('JWT_NAME', token.access_token);
          return token;
        })
      );
  }
}
