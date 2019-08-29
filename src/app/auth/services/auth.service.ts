import { Injectable } from '@angular/core';
import { RegForm } from './registerForm.model';
import { Router } from '@angular/router';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/error.message.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { LoginForm } from '../../authentication/login2/loginForm.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUploading: boolean;
  loginInvalid: boolean;
  currentUser: any;
  isAuthenticated: boolean;

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) { }


  async getJWT(username, password) {
    this.isUploading = true;
    //  return this.http.post<any>('http://104.248.174.205/'+ 'api/token/', { username: username, password: password }).subscribe((res) => {
    //   this.cookieService.set('buccaTokenRefresh', res.refresh);
    //   this.cookieService.set('buccaTokenAccess', res.access);
    //   // console.log('Comes after cookie sets');
    //   window.localStorage.setItem('buccaTokenRefresh', res.refresh);
    //   window.localStorage.setItem('buccaTokenAccess', res.access);
    //   this.httpGETOptions.headers.set('Authorization', 'Bearer ' + res.access);
    //   this.httpNotGETOptions.headers.set('Authorization', 'Bearer ' + res.access);

    //   this.isUploading = false;
    // },
    //   (err: any) => {
    //     // if (err.status === 401 || err.status === 400) {
    //     //   this.isActiveCheck(username, password);
    //     // }
    //     // alert('There was a problem getting JWT'+ err);this.loginInvalid = true;
    //     console.log(err);
    //     this.loginInvalid = true;
    //     switch (err.status) {
    //       // case 400: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE401; break; }
    //       // case 401: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE401; break; }
    //       // case 403: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE403; break; }
    //       // case 500: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e500; break; }
    //       // case 503: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e503; break; }
    //     }
    //     this.isUploading = false;
    //   });
    //console.log(user);
  }

  // getJwt() {
  //   return localStorage.getItem("SecureFareTokenAccess");

  // }

  register(passenger: RegForm) {
    // this.isUploading = true;

    return this.http.post<any>('http://104.248.174.205/auth/passenger/register/', passenger)
    .subscribe((res) => {
      // this.newProfileID = res.id;
      console.log(res);
      alert(`${passenger.first_name} ${passenger.last_name} created successfully.
       Please let user know that they should check their email for confirmation.`);
      // this.isUploading = false;
      this.router.navigate(['/']);
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
        // this.isUploading = false;
      });
    }

  //   login(passenger: LoginForm){
  //     this.cookieService.deleteAll();
  //     this.getJWT(passenger);
  //     let loginInfo = passenger;
  //     this.loginInvalid = false;
  //     this.isUploading = true;
  //     let headers = new HttpHeaders();
  //     headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem("SecurefareTokenAccess"));
  //     // this.isActiveCheck(uname,pwd);
  //     return this.http.post<any>('http://104.248.174.205/auth/login/', loginInfo, {headers})
  //     .do( async res => {
  //         if (res) {
  //           this.currentUser = res;
  //           // console.log(res);
  //           // this.oService.basket = [];
  //          this.cookieService.set('user_id', (res.id));
  //           this.cookieService.set('username', passenger.username);
  //           this.cookieService.get('username');

  //         this.cookieService.set('password', (passenger.password));
  //          this.cookieService.set('user_g', (res.groups[0]));
  //         //  (this.username = uname);
  //         // (this.password = pwd);

  //           await this.cookieService.set('isAuth', 'true');
  //           this.isAuthenticated = Boolean(this.cookieService.get('isAuth'));
  //           this.timedLogout();



  //           this.userGroup = res.groups[0];
  //           if (res.groups[0] == 8) {
  //             // this.allowRoutes();
  //             this.router.navigate(['dashboard/']);
  //           }
  //           else if (res.groups[0] !== 8) {
  //             // this.allowRoutes();
  //             // this.router.navigate(['dashboard/']);
  //           }

  //           // this.router.navigate(['dashboard/']);
  //           this.isUploading = false;
  //         }
  //     }).catch(error => {
  //         this.loginInvalid = true;
  //         console.log(error);
  //         switch (error.status) {


  //         }
  //       // console.log(this.errorMessage);
  //         this.isUploading = false;
  //         return Observable.of(false);
  //       }).subscribe(resp => {
  //         if (!resp) {
  //           this.loginInvalid = true;
  //           /*if (this.loginInvalid = true){
  //               console.log("approaching the target");
  //               setTimeout(function(){this.loginInvalid = false;}, 3000);
  //           }*/
  //         } else {
  //           //console.log('about to nav to the dash');

  //         }
  //       })
  // }
}
