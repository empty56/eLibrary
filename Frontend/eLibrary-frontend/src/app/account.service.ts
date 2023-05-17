import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Account } from './account';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apiService: ApiService, private authService: AuthService) {}
  
  registerAccount(account : Account) {
    return this.apiService.createAccount(account);
  }
  emailExists(email : string) {
    return firstValueFrom(this.apiService.emailExists(email));
  }
  usernameExists(username : string) {
    return firstValueFrom(this.apiService.usernameExists(username));
  }
}
