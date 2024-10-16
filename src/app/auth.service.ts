import { HttpClient } from  '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

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
  httpClient = inject(HttpClient); 
  baseUrl = 'http://109.232.186.180:15380';

  constructor (private http: HttpClient) {
  } 

  login(data: any) {
    return this.httpClient.post<any>(`${this.baseUrl}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('access_token', result.access_token);
        this.isLoggedIn = true;
      }));
  } 

  logout () : void {
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  } 
  isAuthenticated () : boolean {
    return this.isLoggedIn;
  } 
}