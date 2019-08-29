import { Field } from '../classes/field';

import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule, HttpResponse, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as Rx from 'rxjs';

import { appConfig } from '../../../app.config';
import { ERROR_MESSAGE_DICTIONARY } from '../../../shared/error.message.config'
import { CookieService } from 'ngx-cookie-service';
import { LoginForm } from '../loginForm.model';

@Injectable()
export class loginApiService
 {
      public companyListItems: any[];
      public isLoaded: boolean;
      // public errorMessages = ERROR_MESSAGE_DICTIONARY;
      public errorMessage: string = '';
      loginInvalid: boolean;
      public cardInvalid: boolean = false;

      public userProfileIsActive: boolean = false;

      //public isIdle: boolean = true;

      constructor(
        private http: HttpClient,
        public cookieService: CookieService,
         private router: Router
         ) { }

      private serviceUrl: string = 'auth/';
      private profileApiUrl: string = 'canteen/profile/';
      public redirectUrl: string;

      // private apiUrl: string = appConfig.apiUrl+this.serviceUrl;


      public currentUser: any;
      public currentUserID: number;
      public accessToken: string;

      public isUploading = false;

      public isAuthenticated = false;

      public userGroup = null;

      public username: string;
      public password: string;
      // loginInvalid: boolean;


      public dashboardAllowed: boolean; public profileAllowed: boolean; public purchasedTicketsAllowed: boolean;
      public paymentAllowed: boolean;

      public timer: any;

      public increaseTimer: any;

      public newProfileID: number;
      public currentInactiveUserID: number;

      public regInfo: any = {};

      public tokenAccess: any = '';
      public tokenRefresh: any = '';

      public checkCardErrorMessage = '';

      public resetPasswordID: number = null;

      public httpGETOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          // 'X-CSRFToken': this.cookieService.get('csrftoken'),
          'Authorization': 'Bearer ',
        })
      }

      public httpNotGETOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ',
        })
      }





  async getJWT(username, password) {
    this.isUploading = true;
     return this.http.post<any>('http://104.248.174.205/'+ 'api/token/', { username: username, password: password })
     .subscribe((res) => {
      this.cookieService.set('buccaTokenRefresh', res.refresh);
      this.cookieService.set('buccaTokenAccess', res.access);
      // console.log('Comes after cookie sets');
      window.localStorage.setItem('buccaTokenRefresh', res.refresh);
      window.localStorage.setItem('buccaTokenAccess', res.access);
      this.httpGETOptions.headers.set('Authorization', 'Bearer ' + res.access);
      this.httpNotGETOptions.headers.set('Authorization', 'Bearer ' + res.access);

      this.isUploading = false;
    },
      (err: any) => {
        // if (err.status === 401 || err.status === 400) {
        //   this.isActiveCheck(username, password);
        // }
        // alert('There was a problem getting JWT'+ err);this.loginInvalid = true;
        console.log(err);
        this.loginInvalid = true;
        switch (err.status) {
          // case 400: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE401; break; }
          // case 401: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE401; break; }
          // case 403: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE403; break; }
          // case 500: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e500; break; }
          // case 503: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e503; break; }
        }
        this.isUploading = false;
      });
    //console.log(user);
  }

  async refreshJWT() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.cookieService.get('buccaTokenRefresh'));
    this.username = this.cookieService.get('username');
    this.password = this.cookieService.get('password');
    // console.log(this.username,this.password);
    return this.http.post<any>('http://104.248.174.205/auth/login/', { username: this.username, password: this.password }, { headers: headers }).subscribe((res) => {

      this.cookieService.delete('buccaTokenRefresh');
      this.cookieService.delete('buccaTokenAccess');
      this.cookieService.set('buccaTokenRefresh', res.refresh);
      this.cookieService.set('buccaTokenAccess', res.access);
      this.cookieService.set('username', this.username);

      this.httpGETOptions.headers.set('Authorization', 'Bearer ' + res.access);
      this.httpNotGETOptions.headers.set('Authorization', 'Bearer ' + res.access);
      this.isUploading = false;

      window.location.reload();
      // alert('Operator: ' + regInfo.first_name + ' ' + regInfo.last_name + ' created successfully.');
      // this.login(this.username, this.password, res.access, res.refresh);
    },
      (err: any) => {
        //console.log(err);
       console.log('JWT Refresh Fail State');
        window.location.reload();
        this.cookieService.deleteAll();
        this.router.navigate(['login/']);

      });

  }




      login(passenger: LoginForm){
        this.cookieService.deleteAll();
        this.getJWT(passenger.username, passenger.password);
        // let loginInfo = { username: passenger.username, password: passenger.password };
        this.loginInvalid = false;
        this.isUploading = true;
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('buccaTokenAccess'));
        // this.isActiveCheck(passenger.username,passenger.password);
        return this.http.post<any>('http://104.248.174.205/auth/login/', passenger, {headers})
        .do( async res => {
            if (res) {
              this.currentUser = res;
              // console.log(res);
              // this.oService.basket = [];
             this.cookieService.set('user_id', (res.id));
              this.cookieService.set('username', passenger.username);
              this.cookieService.get('username');

            this.cookieService.set('password', (passenger.password));
             this.cookieService.set('user_g', (res.groups[0]));
             (this.username = passenger.username);
            (this.password = passenger.password);

              await this.cookieService.set('isAuth', 'true');
              this.isAuthenticated = Boolean(this.cookieService.get('isAuth'));
              this.timedLogout();



              this.userGroup = res.groups[0];
              if (res.groups[0] == 8) {
                // this.allowRoutes();
                this.router.navigate(['dashboard/']);
              }
              else if (res.groups[0] !== 8) {
                // this.allowRoutes();
                // this.router.navigate(['dashboard/']);
              }

              // this.router.navigate(['dashboard/']);
              this.isUploading = false;
            }
        }).catch(error => {
            this.loginInvalid = true;
            console.log(error);
            switch (error.status) {


            }
          // console.log(this.errorMessage);
            this.isUploading = false;
            return Observable.of(false);
          }).subscribe(resp => {
            if (!resp) {
              this.loginInvalid = true;
              /*if (this.loginInvalid = true){
                  console.log("approaching the target");
                  setTimeout(function(){this.loginInvalid = false;}, 3000);
              }*/
            } else {
              //console.log('about to nav to the dash');

            }
          })
    }

      isLoggedIn() {
    return !!this.getJwt();

  }
    getJwt() {
        return localStorage.getItem('buccaTokenAccess');

      }



      allowRoutes() {
        this.dashboardAllowed = false;
        this.profileAllowed = false;

        this.paymentAllowed = false;

        this.purchasedTicketsAllowed = false;
        this.userGroup = this.cookieService.get('user_g');
          if (Number(this.userGroup) == 8) {//Staff
            //this.auth.userGroup;
            this.dashboardAllowed = true;
            this.profileAllowed = true;

            this.paymentAllowed = true;

            this.purchasedTicketsAllowed = true;

          }
      }


    timedLogout() {
      if (Boolean(this.cookieService.get('isAuth')) === true) {
        this.increaseTimer = window.onmousemove = () => {
          this.resetTimer();
        }
        this.timer = setTimeout(() => {

          this.logout();
        }, 200000);

      }
    }

    resetTimer() {

      this.timedLogout();

    }

    endTimer() {
      if (Boolean(this.cookieService.get('isAuth')) === true) {
        clearTimeout(this.timer);
      }
    }

    logout(){
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + this.cookieService.get('buccaTokenAccess'));
      clearTimeout(this.timer);
      this.cookieService.deleteAll();
      // this.oService.basket = [];
      // console.log(headers);
      // console.log(this.cookieService.get('buccaTokenAccess'));
      return this.http.get<any>('http://104.248.174.205/'+'logout/')
      .subscribe((res) => {
          this.router.navigate(['/']);
      },
      (err: any) => {//console.log(err)
      });
    }

    sendForgotPasswordRequest(email) {
      this.isUploading = true;
      return this.http.post<any>('http://104.248.174.205/'+ 'auth/reset/p/', {email_address: email});
    }



    register(registerInfo) {
      this.isUploading = true;
      this.regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };


      return this.http.post<any>('http://104.248.174.205/auth/passenger/register/', this.regInfo).subscribe((res) => {
        this.newProfileID = res.id;
        alert( + this.regInfo.first_name + ' ' + this.regInfo.last_name + ' created successfully. Please let user know that they should check their email for confirmation.');
        // this.isUploading = false;
        this.router.navigate(['login/']);
      },
        (err: any) => {
          switch (err.status) {
            case 400: { alert(ERROR_MESSAGE_DICTIONARY.createUserE400); break; }
            case 401: { alert(ERROR_MESSAGE_DICTIONARY.createUserE401); break; }
            case 403: { alert(ERROR_MESSAGE_DICTIONARY.createUserE403); break; }
            case 404: { alert(ERROR_MESSAGE_DICTIONARY.createUserE404); break; }
            case 415: { alert(ERROR_MESSAGE_DICTIONARY.createUserE415); break; }
            case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
            case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
          }
          this.isUploading = false;
        });
      }

      // authenticateToken(id, token) {
      //   return this.http.post<any>(appConfig.apiUrl + 'auth/details/', { user_id: id, token: token });
      // }


      authenticateToken(id, token) {
        return this.http.post<any>(appConfig.apiUrl + 'auth/details/', { user_id: id, token: token });
      }



      changePassword(oldPassword, newPassword) {
        this.isUploading = true;
        return this.http.put<any>(appConfig.apiUrl + 'auth/reset/after/', { user_id: this.resetPasswordID, old_password: oldPassword, new_password: newPassword });
      }

    // loggedIn() {
    //   return !!localStorage.getItem('buccaTokenRefresh')
    // }
    //   storeToken(token: string) {
    //     localStorage.setItem("token", token);
    //   }
    //   getToken() {
    //     return localStorage.getItem("token");
    //   }
    //   removeToken() {
    //     return localStorage.removeItem("token");
    //   }




}
