import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private cookieService: CookieService) { }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    sessionStorage.setItem('token', token);
    this.cookieService.set('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
