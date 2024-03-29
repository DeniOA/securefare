// import { Injectable } from '@angular/core';
// import { catchError,  mapTo, tap} from 'rxjs/operators';
// import {appConfig} from '../../app.config'
// import {Tokens} from '../models/tokens';
// import { HttpClient } from '@angular/common/http';
// import { of, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private readonly JWT_TOKEN = 'JWT_TOKEN';
//   private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
//   private loggedUser: string;

//   constructor( private http: HttpClient) { }

//   login(user: {
//     username: string;
//     password: string;
//   }) : Observable<boolean> {
//     return this.http.post<any>(`http://104.248.174.205/api/token/`, user)
//     .pipe(
//       tap(tokens=>this.doLoginUser(user.username, tokens)),
//       mapTo(true),
//       catchError(error => {
//         alert(error.error);
//         return of(false);

//       })
//     );
//   }

//   getUser() {

//   }

//   logout() {
//     return this.http.post<any>(`${appConfig.apiUrl}/auth/logout`, {
//       'refreshToken' : this.getRefreshToken()
//     }).pipe(
//       tap(()=> this.doLogoutUser()),
//       mapTo(true),
//       catchError(error=> {
//         alert(error.error);
//         return of(false);
//       }));

//   }

//   isLoggedIn() {
//     return !!this.getJwtToken();

//   }

//   refreshToken() {
//     return this.http.post<any>(`${appConfig.apiUrl}/refresh`, {
//       'refreshToken': this.getRefreshToken()
//     }).pipe(tap((tokens: Tokens) => {
//       this.storeJwtToken(tokens.jwt);
//     }));

//   }

//   getJwtToken() {
//     return localStorage.getItem(this.JWT_TOKEN);

//   }

//   private doLoginUser(username: string, tokens:Tokens) {
//     this.loggedUser = username;
//     this.storeTokens(tokens);

//   }

//   private doLogoutUser() {
//     this.loggedUser = null;
//     this.removeTokens();
    
//   }

//   private getRefreshToken() {
//     return localStorage.getItem(this.REFRESH_TOKEN);
//   }

//   private storeJwtToken(jwt:string) {
//     localStorage.setItem(this.JWT_TOKEN, jwt);

//   }

//   private storeTokens(tokens: Tokens) {
//     localStorage.setItem(this.JWT_TOKEN, tokens.jwt);
//     localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);

//   }

//   private removeTokens() {
//     localStorage.removeItem(this.JWT_TOKEN);
//     localStorage.removeItem(this.REFRESH_TOKEN);
//   }
// }
