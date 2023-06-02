import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { CurrentUserService } from './current-user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private apiService: ApiService, private currentUserService: CurrentUserService, private toastr: ToastrService) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        
        this._isLoggedIn$.next(true);
        localStorage.setItem('token', response.token);
        this.currentUserService.setCurrentUser();
      },
      (error)=>{
        console.log(error);
        this.toastr.error(error.error.message, 'Error while logging in');
      })
    );
  }

  logout()
  {
    this._isLoggedIn$.next(false); 
    localStorage.removeItem('token');
    this.currentUserService.deleteCurrentUser();
  }
}