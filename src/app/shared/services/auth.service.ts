import { Injectable } from '@angular/core';
import { HttpClient, HttpClientXsrfModule, HttpResponse, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import * as Rx from 'rxjs';

import { appConfig } from '../../app.config';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/services/error.message.config';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../shared/services/user.service';


@Injectable()
export class AuthService {
  public companyListItems: any[];
  public isLoaded: boolean;

  public errorMessages = ERROR_MESSAGE_DICTIONARY;
  public errorMessage: string = '';
  loginInvalid: boolean;
  public cardInvalid: boolean = false;
  
  public userProfileIsActive: boolean = false;

  //public isIdle: boolean = true;

  constructor(private http: HttpClient, public cookieService: CookieService,  private router: Router) { }

  private serviceUrl: string = 'auth/';
  private profileApiUrl: string = 'canteen/profile/';
  public redirectUrl: string;
  
  private apiUrl: string = appConfig.apiUrl+this.serviceUrl;

  public currentUser: any;
  public currentUserID: number;
  public accessToken: string;

  public isUploading = false;

  public isAuthenticated = false;

  public userGroup = null;

  public username: string;
  public password: string;

  public dashboardAllowed: boolean; public profileAllowed: boolean; public createAccountantAllowed: boolean;
  public createManagerAllowed: boolean; public createStaffAllowed: boolean; public basketAllowed: boolean;
  public createSupervisorAllowed: boolean; public createTellerAllowed: boolean; public createCompanyAllowed: boolean;
  public createOperatorAllowed: boolean; public createCustomerServiceAllowed: boolean; public addCardAllowed: boolean;

  public statisticsAllowed: boolean; public inventoryListAllowed: boolean; public stockListAllowed: boolean; public foodListAllowed: boolean;
  public transactionListAllowed: boolean; public staffListAllowed: boolean; public paymentAllowed: boolean; 
  public updateInventoryAllowed: boolean; public voidTransactionAllowed: boolean; public noRefundVoidTransactionAllowed: boolean;

  public addFoodAllowed: boolean; public addCategoryAllowed: boolean;
  public editFoodAllowed: boolean; public editCategoryAllowed: boolean; public superMerchantStaffListAllowed: boolean;
  public topUpAllowed: boolean; public topUpAllAllowed: boolean; public totalCostAllowed: boolean;
  public acitvateUserAllowed: boolean; public deacitvateUserAllowed: boolean; public createSuperMerchantAllowed: boolean;
  public companyTopupHistoryAllowed: boolean; public personalTopupHistoryAllowed: boolean; public massStaffTopupAllowed: boolean;
  public staffTopupAllowed: boolean; public staffTopupSettingsAllowed: boolean;
  public cardTransactionListAllowed: boolean; public personalTransactionListAllowed: boolean;
  public TopupHistoryAllowed: boolean;

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
      'X-CSRFToken': this.cookieService.get('csrftoken'),
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


  return this.http.post<any>(appConfig.apiUrl + 'auth/staff/register/', this.regInfo).subscribe((res) => {
    this.newProfileID = res.id;
    alert('Staff Member: ' + this.regInfo.first_name + ' ' + this.regInfo.last_name + ' created successfully. Please let user know that they should check their email for confirmation.');
    this.isUploading = false;
    this.router.navigate(['complete-registration/']);
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

  authenticateToken(id, token) {
    return this.http.post<any>(appConfig.apiUrl + 'auth/details/', { user_id: id, token: token });
  }

  sendForgotPasswordRequest(email) {
    this.isUploading = true;
    return this.http.post<any>(appConfig.apiUrl + 'auth/reset/p/', {email_address: email});
  }

  changePassword(oldPassword, newPassword) {
    this.isUploading = true;
    return this.http.put<any>(appConfig.apiUrl + 'auth/reset/after/', { user_id: this.resetPasswordID, old_password: oldPassword, new_password: newPassword });
  }


  checkCard(cardID) {
    this.isUploading = true;
    this.cardInvalid = false;
    return this.http.post<any>(appConfig.apiUrl + 'canteen/check/card/', { card_id: cardID.toUpperCase() } ).subscribe((res) => {
      this.isUploading = false;
      // console.log(res[0].used_status);
      this.cardInvalid = res[0].used_status;
      if (res[0].used_status === true) {
        this.checkCardErrorMessage = 'Card already used.';
      } else if (res[0].used_status === false) {
        this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.cardE400;
      }
      // console.log(res);
      // this.router.navigate(['change-password/']);
    },
      (err: any) => {
        // console.log(err);
        switch (err.status) {
          case 400: { this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.cardE401; break; }
          case 401: { this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.cardE401; break; }
          case 403: { this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.cardE403; break; }
          case 404: { this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.cardE404; break; }
          case 500: { this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.e500; break; }
          case 503: { this.checkCardErrorMessage = ERROR_MESSAGE_DICTIONARY.e503; break; }
        }
        this.isUploading = false;
        this.cardInvalid = true;
      });
  }
  addCard(registerInfo) {
    let headers = new HttpHeaders();
    let companyID = this.cookieService.get('user_id');
    headers = headers.set('Authorization', 'Bearer ' + this.cookieService.get('buccaTokenAccess'));
    this.isUploading = true;
    let regInfo = {
      card_id: registerInfo.card_id,
      used: false,
      company: companyID,
      is_active: false,
    };
    return this.http.post<any>(appConfig.apiUrl + 'canteen/add/card/', regInfo, { headers: headers }).subscribe((res) => {
      this.isUploading = false;
      alert('Card: ' + regInfo.card_id + ' added successfully.');
    },
      (err: any) => {
        console.log(err);
        // alert('There was a problem adding this card.');
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.e401); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
        this.isUploading = false;
      });
    //console.log(user);
  }

    createAccountant(registerInfo){      
      this.isUploading = true;
      let regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };
      return this.http.post<any>(appConfig.apiUrl+'auth/accountant/register/', regInfo).subscribe((res) => {
        this.isUploading = false;
        alert('Accountant: ' + regInfo.first_name + ' ' + regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
    },
    (err: any) => {
      // console.log(err);
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
      //console.log(user);
    }
    createCompany(registerInfo){      
      this.isUploading = true;
      let regInfo = {
        username: registerInfo.companyUserName,
        password: registerInfo.password,
        email: registerInfo.hrEmail,
        first_name: 'Company',
        last_name: registerInfo.companyName,
        groups: [],
      };
      return this.http.post<any>(appConfig.apiUrl+'auth/merchant/register/', regInfo).subscribe((res) => {
        //console.log('Register Successful');
        this.isUploading = false;
        alert('Company: ' + regInfo.first_name + ' ' + regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
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
      //console.log(user);
    }

  createCustomerService(registerInfo) {
    this.isUploading = true;
    let regInfo = {
      username: registerInfo.username,
      password: registerInfo.password,
      email: registerInfo.email,
      first_name: registerInfo.firstname,
      last_name: registerInfo.lastname,
      groups: [],
    };
    return this.http.post<any>(appConfig.apiUrl + 'auth/custservice/register/', regInfo).subscribe((res) => {
      //console.log('Register Successful');
      this.isUploading = false;
      // this.router.navigate(['complete-registration/']);
      alert('Customer Service Member: ' + regInfo.first_name + ' ' + regInfo.last_name + ' created successfully. Please let user know that they should check their email for confirmation.');
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
    //console.log(user);
  }
    
    createManager(registerInfo){      
      this.isUploading = true;
      let regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };

        /*console.log('Processing This Below');
        console.log("Attempting to register");
        console.log('Posting This Below');*/
        //console.log(registerInfo);
      return this.http.post<any>(appConfig.apiUrl+'auth/mgt/register/', regInfo).subscribe((res) => {
        //console.log('Register Successful');
        this.isUploading = false;
        alert('Manager: ' + regInfo.first_name + ' ' + regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
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
      //console.log(user);
    }

    createOperator(registerInfo){      
      this.isUploading = true;
      let regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };
      return this.http.post<any>(appConfig.apiUrl+'auth/operation/register/', regInfo).subscribe((res) => {
        //console.log('Register Successful');
        this.isUploading = false;
        alert('Operator: ' + regInfo.first_name + ' ' + regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
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
      //console.log(user);
    }

    createStaff(registerInfo, image){      //, image
      this.isUploading = true;
      this.regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };      
      let updateDetails = {
        image: image.split(',')[1],
        card_id: registerInfo.card_id,
        balance: 0.0,
        company: registerInfo.company,
        is_staff: '',
        sex: registerInfo.sex,
        phone: registerInfo.phone,
        profile_status: true,
        // last_modified: '',
        job_description: registerInfo.address,
        user: this.newProfileID,
        firstname: this.regInfo.first_name,
        lastname: this.regInfo.last_name,
        email: this.regInfo.email,
        address: registerInfo.address,
        location_user: registerInfo.address,
      };

      return this.http.post<any>(appConfig.apiUrl+'auth/staff/register/', this.regInfo).subscribe((res) => {
        
        this.http.put<any>(appConfig.apiUrl + 'canteen/user/update/' + res.id + '/', updateDetails).subscribe((res) => {
          // alert('Staff Member: ' + regInfo.first_name + ' ' + regInfo.last_name + ' CREATED* successfully.');
          this.isUploading = false;
          // this.router.navigate(['login/']);
        },
          (err: any) => {
            console.log(err);
            switch (err.status) {
              case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
              case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); break; }
              case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
              case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
              case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
              case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
              case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
            }
            this.isUploading = false;
          });
        alert('Staff Member: ' + this.regInfo.first_name + ' ' + this.regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
        this.isUploading = false;
        // this.router.navigate(['complete-registration/']);
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
      //console.log(user);
    }

  updateStaff(registerInfo){

      let updateDetails = {
        //image: image.split(',')[1],
        card_id: registerInfo.card_id,
        balance: 0.0,
        company: registerInfo.company,
        is_staff: '',
        sex: registerInfo.sex,
        phone: registerInfo.phone,
        profile_status: true,
        // last_modified: '',
        job_description: registerInfo.address,
        user: this.newProfileID,
        firstname: this.regInfo.first_name,
        lastname: this.regInfo.last_name,
        email: this.regInfo.email,
        address: registerInfo.address,
        location_user: registerInfo.address,
      };
    return this.http.put<any>(appConfig.apiUrl +'canteen/user/update/'+this.newProfileID+'/', updateDetails).subscribe((res) => {
      alert('Staff Member: ' + updateDetails.firstname + ' ' + updateDetails.lastname + ' CREATED* successfully. Please check your email for confirmation.');
        this.isUploading = false;
        this.router.navigate(['login/']);
      },
        (err: any) => {
          console.log(err);
          switch (err.status) {
            case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
            case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); break; }
            case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
            case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
            case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
            case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
            case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
          }
          this.isUploading = false;
        });
    }

    createSupervisor(registerInfo){      
      this.isUploading = true;
      let regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };
      return this.http.post<any>(appConfig.apiUrl+'auth/supervisor/register/', regInfo).subscribe((res) => {
        //console.log('Register Successful');
        this.isUploading = false;
        // this.router.navigate(['complete-registration/']);
        alert('Company: ' + regInfo.first_name + ' ' + regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
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
      //console.log(user);
    }
  createSuperMerchant(registerInfo) {
    this.isUploading = true;
    let regInfo = {
      username: registerInfo.username,
      password: registerInfo.password,
      email: registerInfo.email,
      first_name: registerInfo.firstname,
      last_name: registerInfo.lastname,
      groups: [],
    };
    return this.http.post<any>(appConfig.apiUrl + 'auth/supermerchant/register/', regInfo).subscribe((res) => {
      //console.log('Register Successful');
      this.isUploading = false;
      // this.router.navigate(['complete-registration/']);
      alert('SuperMerchant: ' + regInfo.first_name + ' ' + regInfo.last_name + ' created successfully. Please let user know that they should check their email for confirmation.');
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
    //console.log(user);
  }
    createTeller(registerInfo){      
      this.isUploading = true;
      let regInfo = {
        username: registerInfo.username,
        password: registerInfo.password,
        email: registerInfo.email,
        first_name: registerInfo.firstname,
        last_name: registerInfo.lastname,
        groups: [],
      };
      return this.http.post<any>(appConfig.apiUrl+'auth/teller/register/', regInfo).subscribe((res) => {
        this.isUploading = false;
        alert('Company: ' + regInfo.first_name + ' ' + regInfo.last_name +' created successfully. Please let user know that they should check their email for confirmation.');
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
      //console.log(user);
    }

    
    getCompanyList(){
      // let headers = new HttpHeaders();
      // headers = headers.set('Authorization', 'Bearer ' + this.cookieService.get('buccaTokenRefresh'));
      return this.http.get<any[]>(appConfig.apiUrl+'canteen/company/');
    }
    getCompanyListItems(){
      return this.getCompanyList().subscribe(
        (data) => {this.companyListItems = data;
          this.isLoaded = true;
      },
        (err: any) => {
          console.log(err) 
        }   
      );
    }

  async getJWT(username, password) {
    this.isUploading = true;
     return this.http.post<any>(appConfig.apiUrl + 'api/token/', { username: username, password: password }).subscribe((res) => {
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
          case 400: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE401; break; }
          case 401: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE401; break; }
          case 403: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.loginE403; break; }
          case 500: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e500; break; }
          case 503: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e503; break; }
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
    return this.http.post<any>(appConfig.apiUrl + 'api/token/refresh/', { username: this.username, password: this.password }, { headers: headers }).subscribe((res) => {
      // window.localStorage.setItem('buccaTokenRefresh', res.refresh);
      // window.localStorage.setItem('buccaTokenAccess', res.access);
      this.cookieService.delete('buccaTokenRefresh');
      this.cookieService.delete('buccaTokenAccess');
      this.cookieService.set('buccaTokenRefresh', res.refresh);
      this.cookieService.set('buccaTokenAccess', res.access);
      this.httpGETOptions.headers.set('Authorization', 'Bearer ' + res.access);
      this.httpNotGETOptions.headers.set('Authorization', 'Bearer ' + res.access);
      this.isUploading = false;
      // console.log('refresh was successful?');
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

        
        // alert('There was a problem refreshing JWT' + err);
        // this.isUploading = false;
      });
    //console.log(user);
  }
   

    public isActiveCheck(username, password): any {
      this.isUploading = true;
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', 'Bearer ' + this.cookieService.get('buccaTokenAccess'));
      // console.log('attempt to do isActiveCheck');
      return this.http.post<any>(appConfig.apiUrl + 'canteen/complete/registration/', { username: username }).subscribe((res) => {
        this.currentInactiveUserID = res[0].id;
        this.newProfileID = res[0].id;
        // console.log(res);
        // console.log(this.newProfileID);
        this.isUploading = false;
        if (res[0].active === false) {
          // console.log('Is Inactive');          
          this.userProfileIsActive = false;
        } else {
          // console.log('Is Active');
          this.userProfileIsActive = true;
        }
        //The else if conditions below are the new ones possibly to be implemented on the morning of 27th November 2018. The idea is to 
        //stop any rogue logins from occurring. Still i dont know that it is completely necessary but we will* test it tomorrow.
        if (this.userProfileIsActive === false && res[0].groups === 8){
          this.cookieService.deleteAll();
          this.router.navigate(['complete-registration/']);
        } else if (this.userProfileIsActive === true && res[0].groups === 8) {
          this.allowRoutes();
          this.router.navigate(['dashboard/']);
        } /*else if (this.userProfileIsActive === false && res[0].groups !== 8) {
          this.login(username, password);
        } else {
          console.log(res[0].groups !== 8);
          console.log(this.userProfileIsActive);
          console.log(res);
          
        }*/
        // return res[0].active;
        //alert('Company: ' + regInfo.first_name + ' ' + regInfo.last_name + ' created successfully.');
      },
        (err: any) => {
          console.log(err);
          // this.errorMessage = 'You do not have a valid account with us. Please Register.'

          switch (err.status) {
            case 400: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e401; break; }
            case 401: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e401; break; }
            case 403: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e403; break; }
            case 500: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e500; break; }
            case 503: { this.errorMessage = ERROR_MESSAGE_DICTIONARY.e503; break; }
          }
          return false;
          //alert('There was a problem creating this user.');
          //this.isUploading = false;
        });
    }


 
    endTimer() {
      if (Boolean(this.cookieService.get('isAuth')) === true) {
        clearTimeout(this.timer);
      }
    }

  
    allowRoutes() {
      this.dashboardAllowed = false; this.profileAllowed = false; this.foodListAllowed = false; this.addCategoryAllowed = false;
      this.addFoodAllowed = false; this.editCategoryAllowed = false; this.editFoodAllowed = false; this.inventoryListAllowed = false;
      this.stockListAllowed = false; this.paymentAllowed = false; this.transactionListAllowed = false; this.statisticsAllowed = false;
      this.staffListAllowed = false; this.createAccountantAllowed = false; this.createManagerAllowed = false; this.createOperatorAllowed = false;
      this.createSupervisorAllowed = false; this.createTellerAllowed = false; this.createCompanyAllowed = false; this.createCustomerServiceAllowed = false; 
      this.createStaffAllowed = false; this.updateInventoryAllowed = false;this.basketAllowed = false; this.superMerchantStaffListAllowed = false;
      this.voidTransactionAllowed = false; this.noRefundVoidTransactionAllowed = false; this.addCardAllowed = false;
      this.topUpAllowed = false; this.topUpAllAllowed = false; this.acitvateUserAllowed = false; this.deacitvateUserAllowed = false; this.createSuperMerchantAllowed = false;
      this.companyTopupHistoryAllowed = false; this.personalTopupHistoryAllowed = false; this.totalCostAllowed = false; this.massStaffTopupAllowed = false;
      this.cardTransactionListAllowed = false; this.personalTransactionListAllowed = false; this.staffTopupAllowed = false; this.staffTopupSettingsAllowed = false;    
      this.TopupHistoryAllowed = false; 
      this.userGroup = this.cookieService.get('user_g');
        if (Number(this.userGroup) == 1) {//SID        
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.foodListAllowed = true;
          this.addCategoryAllowed = true;
          this.addFoodAllowed = true;
          this.editCategoryAllowed = true;
          this.editFoodAllowed = true;
          this.inventoryListAllowed = true;
          this.stockListAllowed = true;
          this.paymentAllowed = true;
          this.transactionListAllowed = true;
          this.statisticsAllowed = true;
          this.staffListAllowed = true;
          this.addCardAllowed = true;
          this.createAccountantAllowed = true;
          this.createManagerAllowed = true;
          this.createOperatorAllowed = true;
          this.createSupervisorAllowed = true;
          this.createTellerAllowed = true;
          this.createCompanyAllowed = true;
          this.createSuperMerchantAllowed = true;
          this.createStaffAllowed = true;
          this.updateInventoryAllowed = true;
          this.basketAllowed = true;
          this.voidTransactionAllowed = true;
          this.noRefundVoidTransactionAllowed = true;
          this.topUpAllowed = true;
          this.topUpAllAllowed = true;
          this.totalCostAllowed = true;
          this.staffTopupAllowed = true;
          this.massStaffTopupAllowed = true;
          this.staffTopupSettingsAllowed = true;
          this.createCustomerServiceAllowed = true;
          this.superMerchantStaffListAllowed = true;
          this.TopupHistoryAllowed = true; 
          // this.deacitvateUserAllowed = true;
          this.acitvateUserAllowed = true;
        } else if (Number(this.userGroup) == 2) {//Company
          //this.auth.userGroup;        
          this.dashboardAllowed = true;
          this.foodListAllowed = true;
          this.inventoryListAllowed = true;
          this.stockListAllowed = true;
          this.staffListAllowed = true;
          this.transactionListAllowed = true;
          this.addCardAllowed = true;
          this.createSupervisorAllowed = true;
          this.createStaffAllowed = true;
          // this.deacitvateUserAllowed = true;
          this.acitvateUserAllowed = true;
          this.totalCostAllowed = true;
        } else if (Number(this.userGroup) == 3) {//Supervisor
          //this.auth.userGroup;
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.inventoryListAllowed = true;
          this.stockListAllowed = true;
          this.voidTransactionAllowed = true;
          // this.noRefundVoidTransactionAllowed = true;
        } else if (Number(this.userGroup) == 4) {//Accountant        
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.staffListAllowed = true;
          this.noRefundVoidTransactionAllowed = true;
          this.transactionListAllowed = true;
          this.massStaffTopupAllowed = true;
          this.staffTopupAllowed = true;
          this.staffTopupSettingsAllowed = true;
          this.TopupHistoryAllowed = true; 
        } else if (Number(this.userGroup) == 5) {//Teller
          //this.auth.userGroup;        
          this.dashboardAllowed = true;
          this.profileAllowed = true;
        } else if (Number(this.userGroup) == 6) {//Management
          //this.auth.userGroup;
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.transactionListAllowed = true;
          this.totalCostAllowed = true;
        } else if (Number(this.userGroup) == 7) {//Operations
          //this.auth.userGroup;
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.inventoryListAllowed = true;
          this.stockListAllowed = true;
          this.updateInventoryAllowed = true;
          this.foodListAllowed = true;
          this.addCategoryAllowed = true;
          this.addFoodAllowed = true;
          this.editCategoryAllowed = true;
          this.editFoodAllowed = true;
          this.transactionListAllowed = true;
        } else if (Number(this.userGroup) == 8) {//Staff
          //this.auth.userGroup;
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.foodListAllowed = true;
          this.paymentAllowed = true;
          this.transactionListAllowed = true;
          this.basketAllowed = true;
          this.companyTopupHistoryAllowed = true; 
          this.personalTopupHistoryAllowed = true;
          this.cardTransactionListAllowed = true;
          this.personalTransactionListAllowed = true;        
        } else if (Number(this.userGroup) == 9) {//Super Merchant HR
          //this.auth.userGroup;
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.foodListAllowed = true;
          this.transactionListAllowed = true;
          this.inventoryListAllowed = true;
          this.stockListAllowed = true;
          this.createAccountantAllowed = true;
          this.createManagerAllowed = true;
          this.createOperatorAllowed = true;
          this.createSupervisorAllowed = true;
          this.createTellerAllowed = true;
          this.createCompanyAllowed = true;
          this.createCustomerServiceAllowed = true;
          this.superMerchantStaffListAllowed = true;
        } else if (Number(this.userGroup) == 10) {//Customer Service
          //this.auth.userGroup;
          this.dashboardAllowed = true;
          this.profileAllowed = true;
          this.foodListAllowed = true;
          this.addCategoryAllowed = true;
          this.addFoodAllowed = true;
          this.editCategoryAllowed = true;
          this.editFoodAllowed = true;
        }
    }
}
