import { Injectable } from '@angular/core';
import { appConfig } from '../../app.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TopUpService {
  private serviceUrl: string = 'canteen/topuphistory/';
  private apiUrl = appConfig.apiUrl + this.serviceUrl;
  public isLoaded: boolean = false;
  public companyListItems: any[];
  public userListItems: any[];
  public today: string = '';
  public apiItems: any[] = [];
  public apsItems: any[] = [];
  public todaysInvFoodNames: any[];
  public todaysInvFoodQuantities: any[];
  public isUploading: boolean = false;

  constructor( private http: HttpClient,  public auth: AuthService, public cookieService: CookieService) { }
  public httpGETOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRFToken': this.cookieService.get('csrftoken'),
      'Authorization': 'Bearer ' + this.cookieService.get('buccaTokenAccess'),
    })
  }

  public httpNotGETOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.cookieService.get('buccaTokenAccess'),
    })
  }

  getTopUpList() {
    return this.http.get<any[]>(appConfig.apiUrl + 'canteen/topup/', this.httpGETOptions);
  }
  getTopupListItems() {
    return this.getTopUpList().subscribe(
      (data) => {
        this.apsItems = data;
        console.log(data);
        this.isLoaded = true;
      },
      (err: any) => {
        //console.log(err);
        switch (err.status) {
          //case 400: { this.errorMessage = this.defaultErrorMessage; }
          case 401: { this.auth.refreshJWT(); break; }
        }
      }
    );
  }

  getData(date) {
    return this.http.post<any[]>(this.apiUrl, { check_date: date }, this.httpNotGETOptions);
  }
  getItems() {
    this.isLoaded = false;
    return this.getData(this.getTodaysDate()).subscribe(
      (data) => {
      this.apiItems = data;
      console.log(this.apiItems);
      this.isLoaded = true;
      },
      (err: any) => {
        switch (err.status) {
          //case 400: { this.errorMessage = this.defaultErrorMessage; }
          case 401: { this.auth.refreshJWT(); break; }
        }
      }
    );
  }

  getTodaysDate() {
    let todaysDate: Date = new Date();
    let dd;
    if (Number(((todaysDate.getDate() + 1) + '').substring(1, 2)) > 0) {
      dd = todaysDate.getDate();
    } else {
      dd = ('0' + (todaysDate.getDate()));
    }
    let mm;

    if (Number(((todaysDate.getMonth() + 1))) > 9) {
      mm = todaysDate.getMonth() + 1; //January is 0!
      // } else if (Number(((todaysDate.getMonth() + 1) + '').substring(1, 2)) > 0) {
      //   mm = todaysDate.getMonth() + 1; //January is 0!
    } else {
      mm = ('0' + (todaysDate.getMonth() + 1)); //January is 0!
    }
    let yyyy = todaysDate.getFullYear();
    this.today = ('' + yyyy + '-' + mm + '-' + dd);
    return this.today;
  }

  getDateFromString(utc) {
    return utc.split('T')[0];
  }

  getTimeFromString(utc) {
    return (utc.split('.')[0]);
  }

}
