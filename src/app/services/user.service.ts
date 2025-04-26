import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  apiUrlBase: string = environment.apiUrlBase + '/v1/api/users';
  userId: string | null = this.authService.getUserId();

  getUserById(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlBase}/${this.userId}`);
  }

  changeUserPassword(credentials: { userPassword: string, userNewPassword: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrlBase}/${this.userId}`, credentials);
  }

}
