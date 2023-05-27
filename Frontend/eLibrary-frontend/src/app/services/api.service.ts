import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../entities/account';
import { Review } from '../entities/review';
import { Book } from '../entities/book';
import { Link } from '../entities/link';

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
    return this.http.get<Review[]>(`${this.baseUrl}/noauth/reviews`);
  }

  deleteReview(id: number) : Observable<Map<string, boolean>>{
    return this.http.delete<Map<string, boolean>>(`${this.baseUrl}/review/delete/${id}`);
  }

  updateAccount(account: Account) {
    return this.http.put(`${this.baseUrl}/admin/account/update/${account.id}`, account);
  }

  addBook(book: Book) {
    return this.http.post(`${this.baseUrl}/admin/book/new`, book);
  }
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/noauth/books`);
  }
  searchBooks(search: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/noauth/books/search/${search}`);
  }

  deleteBook(id: number) : Observable<Map<string, boolean>>{
    return this.http.delete<Map<string, boolean>>(`${this.baseUrl}/admin/book/delete/${id}`);
  }

  updateBook(book: Book){
    return this.http.put(`${this.baseUrl}/admin/book/update/${book.id}`, book);
  }

  uploadBook(book_id : number, files: FormData){
    return this.http.post(`${this.baseUrl}/admin/book/upload/${book_id}`, files);
  }

  getLinks(): Observable<Link[]> {
    return this.http.get<Link[]>(`${this.baseUrl}/links`);
  }

  getBookLink(book_id : number): Observable<Link> {
    return this.http.get<Link>(`${this.baseUrl}/link/${book_id}`);
  }

  updateLink(link: Link){
    return this.http.put(`${this.baseUrl}/admin/link/update/${link.id}`, link);
  }

  getBestRatedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/noauth/books/bestRated`);
  }
  getBookRating(book_id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/noauth/book/rating/${book_id}`);
  }
  getBook(book_id: number): Observable<Book>{
    return this.http.get<Book>(`${this.baseUrl}/noauth/book/${book_id}`);
  }
}
