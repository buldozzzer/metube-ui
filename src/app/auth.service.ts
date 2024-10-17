import { HttpClient } from  '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


export interface LoginStatus {
    access_token?: string;
    msg?: string;
}

export interface Login {
    username: string,
    password: string
}

@Injectable({providedIn: 'root'})
export  class  AuthService {
  loading : boolean = true;
  isLoggedIn : boolean = false; 
  apiUrl = 'http://109.232.186.180:15380';
  jwtToken: string
  decodedToken: { [key: string]: string };

  constructor (private httpClient: HttpClient, public cookieSevice: CookieService) {
    if (environment.production){
      this.apiUrl = environment.url
    }
    if (!this.isTokenExpired()) {
      this.isLoggedIn = true
    }
  } 

  login(data: any) {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, data)
      .pipe(map(result => {
        this.jwtToken = result.access_token
        this.cookieSevice.set('access_token', this.jwtToken, { expires: 3650 })
        this.isLoggedIn = true;
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  } 

  logout () : void {
    this.cookieSevice.delete('access_token');
    this.isLoggedIn = false;
  }
  isAuthenticated () : boolean {
    return this.isLoggedIn;
  }

  decodeToken() {
    if (this.jwtToken) {
    this.decodedToken = jwtDecode(this.jwtToken);
    }
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = Number(this.getExpiryTime());
    if (expiryTime) {
      return ((1000 * expiryTime) - (new Date()).getTime()) < 3650;
    } else {
      return false;
    }
  }

}