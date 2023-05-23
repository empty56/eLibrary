import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../entities/account';
import { Review } from '../entities/review';
import { Book } from '../entities/book';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

private baseUrl = "http://localhost:8080/api";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/auth`, { email, password });
  }

  createAccount(account: Account) : Observable<Object>{
    return this.http.post(`${this.baseUrl}/register`, account)
  }
  emailExists(email: string): Observable<boolean>{
    return this.http.get<boolean>(`${this.baseUrl}/checkEmail/${email}`);
  }
  getAccount(email: string): Observable<Account>{
    return this.http.get<Account>(`${this.baseUrl}/email/${email}`);
  }
  getUsers(): Observable<Account[]>{
    return this.http.get<Account[]>(`${this.baseUrl}/users`);
  }

  getReviews() : Observable<Review[]>{
    return this.http.get<Review[]>(`${this.baseUrl}/reviews`);
  }

  deleteReview(id: number) : Observable<Map<string, boolean>>{
    return this.http.delete<Map<string, boolean>>(`${this.baseUrl}/review/delete/${id}`);
  }

  updateAccount(account: Account) {
    return this.http.put(`${this.baseUrl}/account/update/${account.id}`, account);
  }

  addBook(book: Book) {
    return this.http.post(`${this.baseUrl}/book/new`, book);
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }
  deleteBook(id: number) : Observable<Map<string, boolean>>{
    return this.http.delete<Map<string, boolean>>(`${this.baseUrl}/book/delete/${id}`);
  }

  updateBook(book: Book){
    return this.http.put(`${this.baseUrl}/book/update/${book.id}`, book);
  }

  createLink(book: Book){
    return this.http.put(`${this.baseUrl}/book/update/${book.id}`, book);
  }
}
