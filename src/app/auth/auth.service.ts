import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from './models/auth-data';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean;
  private token: string;
  private AuthStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private route: Router) {}

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
        if (response.token) {
          this.token = response.token;
          this.isAuthenticated = true;
          this.AuthStatusListener.next(true);
          this.route.navigate(['/']);
        }
      });
  }

  getToken(): string {
    return this.token;
  }

  getUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getAuthStatusListener(): Observable<boolean> {
    return this.AuthStatusListener.asObservable();
  }

  onLogout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.AuthStatusListener.next(false);
    this.route.navigate(['/']);
  }
}
