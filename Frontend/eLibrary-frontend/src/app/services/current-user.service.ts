import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtToken } from '../entities/jwt-token';
import jwt_decode from 'jwt-decode';

import { AccountService } from './account.service';
import { Account } from '../entities/account';
@Injectable()
export class CurrentUserService {
  currentUser$ = new BehaviorSubject<
     Account  | null | undefined
  >(undefined);

  constructor(private accountService : AccountService){
  }

  async setCurrentUser() {
    let token = localStorage.getItem('token');
    if (token) {
      const decodedToken  = this.decodeToken(token);
      const email = decodedToken.sub;
      const account = await this.accountService.getAccount(email);
      this.currentUser$.next(account);
    } else {
      this.currentUser$.next(null);
    }
  }
  private decodeToken(token: string): JwtToken {
    return jwt_decode<JwtToken>(token);
  }
}

