import { post } from "selenium-webdriver/http";
import { Observable, of, throwError, pipe } from "rxjs";

import { Injectable } from '@angular/core';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Http, Response } from '@angular/http';

import {  map, filter, catchError, mergeMap } from 'rxjs/operators';





@Injectable()
export class signupApiService
 {

    public apiURL: string= "http://104.248.174.205/auth/passenger/register/";
      constructor(private http: HttpClient) { }
  

      RegisterUser (user: any)  {
          return this.http.post(this.apiURL, user)
          .pipe(
            map(res=>res),
            catchError(this.errorHandler)
          );
      } errorHandler(error:Response) {
        console.log(error);
        return throwError(error);
      }
    


// registerUser(userData): Observable<any> {
//   return this.http.post('http://104.248.174.205/auth/passenger/register/', userData);
// }


}