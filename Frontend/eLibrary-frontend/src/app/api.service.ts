import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

private baseUrl = "http://localhost:8080/library";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth`, { email, password });
  }

  createAccount(account: Account) : Observable<Object>{
    return this.http.post(`${this.baseUrl}/register`, account)
  }
  emailExists(email: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/email/${email}`);
  }
  usernameExists(username: string){
    return this.http.get(`${this.baseUrl}/username/${username}`);
  }
  getAccount(username: string): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/user/${username}`);
  }
}
