import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthData } from './models/auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string;

  constructor(private http: HttpClient) {}

  createUser(email: string, password: string) {
    const authData: AuthData = new AuthData();
    authData.email = email;
    authData.password = password;
    this.http
      .post(environment.ApiBasePath + environment.UserSignup, authData)
      .subscribe((response) => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    const authData: AuthData = new AuthData();
    authData.email = email;
    authData.password = password;
    console.log(environment.ApiBasePath + environment.UserLogin);
    this.http
      .post<{ token: string }>(
        environment.ApiBasePath + environment.UserLogin,
        authData
      )
      .subscribe((response) => {
        this.token = response.token;
      });
  }

  getToken(): string {
    return this.token;
  }
}
