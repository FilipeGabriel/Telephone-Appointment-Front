import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrlBase: string = environment.apiUrlBase + '/v1/api/users';
  apiUrlRegister: string = environment.apiUrlBase + environment.registerUrl;
  tokenUrl: string = environment.apiUrlBase + environment.getTokenUrl;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor( private http: HttpClient ) { }

  insert(credentials: { userEmail: string, userPassword: string }): Observable<any> {
      return this.http.post(this.apiUrlRegister, credentials);
  }

  tryLogin(credentials: { userEmail: string, userPassword: string }): Observable<any> {
      return this.http.post(this.tokenUrl, credentials);
  }

  updatePassword(credentials: { userPassword: string, userNewPassword: string }): Observable<any> {
      return this.http.put(`${this.apiUrlBase}/${this.getUserId()}`, credentials);
  }

  getUserById(): Observable<any> {
      return this.http.get<any>(`${this.apiUrlBase}/${this.getUserId()}`);
  }

  logout(): void {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_id');
  }

  getToken(): string | null {
      return localStorage.getItem('access_token');
  }

  getUserId(): string | null {
      return localStorage.getItem('user_id');
  }

  isAuthenticated(): boolean {
      const token = this.getToken();
      if ( token ) {
          const expired = this.jwtHelper.isTokenExpired(token);
          return !expired;
      }
      return false;
  }

}
