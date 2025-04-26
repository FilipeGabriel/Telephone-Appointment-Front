import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {

  apiUrlBase: string = environment.apiUrlBase + '/v1/api/contacts';
  apiUrlContactsByUser: string = environment.apiUrlBase + '/v1/api/contacts/find-all';
  userId: string | null = this.authService.getUserId();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getContactById(contactId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrlBase}/${contactId}`);
  }

  getContactsByUserId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlContactsByUser}/${this.userId}`);
  }

  insertContact(contact: {
    contactName: string,
    contactEmail: string,
    contactCellPhone: string,
    contactTelephone: string,
    contactYNFavorite: number,
    contactYNActive: number
  }): Observable<any> {
    const newContact = {
      ...contact,
      contactUserId: this.userId
    };
    return this.http.post<any>(`${this.apiUrlBase}`, newContact);
  }

  updateContact(contactId: number, contact: {
    contactName: string,
    contactEmail: string,
    contactCellPhone: string,
    contactTelephone: string,
    contactYNFavorite: number,
    contactYNActive: number
  }): Observable<any> {
    return this.http.put<any>(`${this.apiUrlBase}/${contactId}`, contact);
  }

  deleteContact(contactId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlBase}/${contactId}`);
  }

}
