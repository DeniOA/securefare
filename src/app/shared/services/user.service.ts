import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { appConfig } from '../../app.config';
import { AuthService } from '../../shared/services/auth.service';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/services/error.message.config';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, public auth: AuthService, public cookieService: CookieService) { }

  private serviceUrl: string = 'canteen/users/';
  private apiUrl = appConfig.apiUrl + this.serviceUrl;
  public apiItems: any[];
  public apiProfile: any;
  public apiStaffItems: any[] = [];
  public apiStaffStatusItems: any[];
  public superMerchantStaffItems: any[];
  public topupSettings: any[] = [];
  public isLoaded: boolean = false;
  public staffListIsLoaded: boolean = false;
  public cardID: string = '';
  public staffFilterTerm: string = '';
  public selectedMeal: any;
  public companyListItems: any[];
  public selectedStaffMember: any;
  public isComp = false;
  public currentUserID = Number(this.cookieService.get('user_id'));
  public currentProfileID = this.cookieService.get('user_id'); //this.savedUser.id
  public currentUsername = this.cookieService.get('username'); //this.savedUser.id
  public staffCount: number = 0;
  public userCount: number = 0;
  public isUploading: boolean = false;

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

  public mockStaff: any[] = [
    {id: 1, firstname: 'Farouk', lastname: 'Oyofo', email: 'farouk.oyofo@gmail.com', company: 'SecureID', sex: 'Male', phone: '01937297291', balance: '0', card_id: 'XYZ721IDSLK'}
  ]


  getCompanyNameFromList(id) {
    try {
      return this.companyListItems.find(i => i.id === id).name;
    } catch { }

  }

  // setFilterTermToCompanyName() {
  //   this.isComp = JSON.parse(this.cookieService.get('isComp'));
  //   this.currentUserID = Number(this.cookieService.get('user_id'));
  //   // console.log('in the right condition 2');

  //   // console.log(this.staffFilterTerm);
  //   // console.log(this.currentUserID);
  //   console.log(this.getCompanyListItems());
  //   this.filterBy(this.getCompanyNameFromList(this.currentUserID));
  //   // console.log(this.getCompanyNameFromList(this.currentUserID));
  //   // console.log(this.staffFilterTerm);
  // }

  filterBy(property) {
    if (property === 'all') {
      this.staffFilterTerm = '';
    } else {
      this.staffFilterTerm = property;
    }
  };

  addFunds(amount, userID): any {
    this.isUploading = true;
    // let currentBalance = Number(this.selectedStaffMember.balance);
    // let newFunds = Number(amount);
    // console.log(amount);
    // console.log(newFunds);
    // let newBalance = (currentBalance + newFunds);
    // let updateInfo = {
    //   balance: (currentBalance + newFunds),
    // }
    // console.log(userID, amount);
    // console.log(this.selectedStaffMember);
    return this.http.post(appConfig.apiUrl + 'canteen/topup/staff/', { user_id: userID, amount: amount }, this.httpNotGETOptions).subscribe(
      (res) => {
        this.isUploading = false;
        //console.log(res);
        this.getStaffItems();
        alert('Balance was successfully updated.');
        // this.selectedStaffMember.balance = newFunds;
        ////console.log(res);
      },
      (err: any) => {
        this.isUploading = false;
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); this.auth.refreshJWT(); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
          case 413: { alert(ERROR_MESSAGE_DICTIONARY.e413); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
      }
    );
  }
  
  getTopupSettings(): any {
    this.isUploading = true;
    return this.http.get(appConfig.apiUrl + 'canteen/bulktopup/', this.httpNotGETOptions).subscribe(
      (data) => {
        this.isUploading = false;
        // this.topupSettings = [];
        // this.topupSettings = data;
        // alert('Balance was successfully updated.');
        // this.selectedStaffMember.balance = newFunds;
        ////console.log(res);
      },
      (err: any) => {
        this.isUploading = false;
        //console.log(err);
        switch (err.status) {
          //case 400: { this.errorMessage = this.defaultErrorMessage; }
          case 401: { this.auth.refreshJWT(); break; }
        }
      }
    );
  }

  setTopupSettings(amount, userID): any {
    let topupSetting = {
      amount_added: amount,
      user_id: userID,
    }

    try {
      if (this.topupSettings.find(i => i.user_id === topupSetting.user_id)) {
        //console.log('condition satisfied');
        this.topupSettings.find(i => i.amount_added === topupSetting.amount_added).amount_added = topupSetting.amount_added;
        // this.topupSettings.find(i => i.food_name === topupSetting.food_name).total += topupSetting.total;
      } else {
        this.topupSettings.push(topupSetting);
      }
      // for (let i = 0; i < this.topupSettings.length; i++) {
      //   this.topupSettingsCount++;
      //   this.topupSettingsTotal += this.topupSettings[i].total
      // }
      console.log(this.topupSettings);
      this.cookieService.delete('buccaTopupSettings');
      this.cookieService.set('buccaTopupSettings', JSON.stringify(this.topupSettings));
      // alert('' + topupSetting.quantity + ' unit(s) of ' + topupSetting.food_name + ' added to basket.');
      // addToCartForm.reset();
    } catch (err) {
      //console.log(err);
    }

    this.topupSettings.push(topupSetting);
  }

  sendTopupSettings(amount, userID): any {
    this.isUploading = true;
    return this.http.post(appConfig.apiUrl + 'canteen/bulktopup/', this.topupSettings, this.httpNotGETOptions).subscribe(
      (data) => {
        this.isUploading = false;
        //console.log(res);
        this.getStaffItems();
        alert('Balance was successfully updated.');
        // this.selectedStaffMember.balance = newFunds;
        ////console.log(res);
      },
      (err: any) => {
        this.isUploading = false;
        //console.log(err);
        switch (err.status) {
          //case 400: { this.errorMessage = this.defaultErrorMessage; }
          case 401: { this.auth.refreshJWT(); break; }
        }
      }
    );
  }

  addPaystackFunds(amount, paystackRef): any {
    this.currentUserID = Number(this.cookieService.get('user_id'));
    return this.http.post(appConfig.apiUrl + 'canteen/topup/personal/', { user_id: this.currentUserID, amount: amount, ref_no: paystackRef }, this.httpNotGETOptions).subscribe(
      (res) => {
        console.log(res);
      },
      (err: any) => {
        console.log(err);
        switch (err.status) {
          //case 400: { this.errorMessage = this.defaultErrorMessage; }
          case 401: { this.auth.refreshJWT(); break; }
        }
      }
    );
  }

  getData() {
    return this.http.get<any[]>(this.apiUrl, this.httpGETOptions);
  }
  getItems() {
    this.isComp = JSON.parse(this.cookieService.get('isComp'));
    this.currentUserID = Number(this.cookieService.get('user_id'));
    this.currentProfileID = this.cookieService.get('user_id'); //this.savedUser.id
    this.currentUsername = this.cookieService.get('username');
    this.isLoaded = false;
    return this.getData().subscribe(
      (data) => {
      this.apiItems = data;

        /*if (this.isComp === true) {
          let cUserID = this.currentUserID;
          this.userCount = 0;
          data.filter((item) => {
            if (item.company_name === cUserID){      
              this.apiItems.push(item);
              this.userCount++;
            }            
          });
      } else*//* if (this.isComp === false) {
            this.userCount = 0;
            data.filter((item) => {
              //if (item.is_staff.toLowerCase() === 'sta') {
                this.apiItems.push(item);
                this.userCount++;
              //}
            })
          }*/
        this.userCount = 0;
        for (let i = 0; i < this.apiItems.length; i++) {
          this.userCount++;
        }
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

  getStaffData() {
    return this.http.get<any[]>(appConfig.apiUrl + 'canteen/staff/', this.httpNotGETOptions);
  }
  getStaffItems() {
    this.isComp = JSON.parse(this.cookieService.get('isComp'));
    this.currentUserID = Number(this.cookieService.get('user_id'));
    let companyID = Number(this.cookieService.get('user_id'));
    this.isLoaded = false;
    this.staffListIsLoaded = false;
    return this.getStaffData().subscribe(
      (data) => {
        // console.table(data);
      if(this.isComp) {        
        data.filter((item) => {
          // console.log(companyID);
          // console.log(item.company_name);
          if (Number(item.company_name) === companyID) {
            // console.log(this.apiStaffItems);
            this.apiStaffItems.push(item);
          }
        });
        this.staffListIsLoaded = true;
      } else {
        this.apiStaffItems = data;
        this.staffListIsLoaded = true;
      }
        this.isLoaded = true;
        // this.staffListIsLoaded = true;
        this.staffCount = 0;
        for (let i = 0; i < this.apiStaffItems.length; i++) {
          this.staffCount++;
        }        
        // console.log(this.isLoaded);
        // console.log(this.staffListIsLoaded);
        // console.table(this.apiStaffItems);

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

  getStaffStatusData() {
    return this.http.post<any[]>(appConfig.apiUrl + 'canteen/allstaffs/', {}, this.httpNotGETOptions);
  }
  getStaffStatusItems() {
    this.isComp = JSON.parse(this.cookieService.get('isComp'));
    let companyName = this.cookieService.get('compName');
    this.currentUserID = Number(this.cookieService.get('user_id'));
    this.isLoaded = false;
    return this.getStaffStatusData().subscribe(
      (data) => {
        // this.apiStaffStatusItems = data;
        // this.staffCount = 0;
        if (this.isComp) {
          data.filter((item) => {
            // console.log(companyName);
            // console.log(item.company);
            // console.log(item.company_name);
            if (item.company === companyName) {
              // console.log(this.apiStaffItems);
              this.apiStaffStatusItems.push(item);
            }
          });
          this.staffListIsLoaded = true;
        } else {
          this.apiStaffStatusItems = data;
          this.staffListIsLoaded = true;
        }
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

  countStaffItems() {
    this.staffCount = 0;
    for (let i = 0; i < this.apiItems.length; i++) {
      this.staffCount++;
    }
    return this.staffCount;
  }

  activateUser(user, firstname, lastname) {
    return this.http.post(appConfig.apiUrl + 'canteen/activate/user/', { user_id: user }, this.httpNotGETOptions).subscribe(
      (res) => {
        //console.log(res);
        this.getStaffStatusItems();
        alert(firstname + ' ' + lastname + ' successfully activated');
      },
      (err: any) => {
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); this.auth.refreshJWT(); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
          case 413: { alert(ERROR_MESSAGE_DICTIONARY.e413); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
      }
    );
  }

  deactivateUser(user, firstname, lastname) {
    return this.http.post(appConfig.apiUrl + 'canteen/deactivate/user/', { user_id: user }, this.httpNotGETOptions).subscribe(
      (res) => {
        //console.log(res);
        this.getStaffStatusItems();
        alert(firstname + ' ' + lastname + ' successfully deactivated');
      },
      (err: any) => {
        //console.log(err);
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); this.auth.refreshJWT(); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
          case 413: { alert(ERROR_MESSAGE_DICTIONARY.e413); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
      }
    );
  }

  getSuperMerchantStaffData() {
    return this.http.post<any[]>(appConfig.apiUrl + 'canteen/supermerch/staffs/', [{}], this.httpNotGETOptions);
  }
  getSuperMerchantStaffItems() {
    // this.isComp = JSON.parse(this.cookieService.get('isComp'));
    // this.currentUserID = Number(this.cookieService.get('user_id'));
    // let companyID = Number(this.cookieService.get('user_id'));
    this.isLoaded = false;
    this.staffListIsLoaded = false;
    return this.getSuperMerchantStaffData().subscribe(
      (data) => {
        // console.log(data);
        this.superMerchantStaffItems = data;
        this.staffListIsLoaded = true;
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

  getCompanyList() {
    return this.http.get<any[]>(appConfig.apiUrl + 'canteen/company/');
  }
  getCompanyListItems() {
    // this.isComp = JSON.parse(this.cookieService.get('isComp'));
    // this.currentUserID = Number(this.cookieService.get('user_id'));
    return this.getCompanyList().subscribe(
      (data) => {
      this.companyListItems = data;
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
  getCompanyListItemsII() {
    this.isComp = JSON.parse(this.cookieService.get('isComp'));
    this.currentUserID = Number(this.cookieService.get('user_id'));
    this.getCompanyList().subscribe(
      (data) => {
      this.companyListItems = data;
        return this.companyListItems;
      },
      (err: any) => {
        //console.log(err);
        switch (err.status) {
          //case 400: { this.errorMessage = this.defaultErrorMessage; }
          case 401: { this.auth.refreshJWT(); break; }
        }
        // alert(err);
      }
    );
  }

  displayStaff(staff) {
    this.selectedStaffMember = staff;
  }

  resetCounters() {
    this.userCount = 0;
  }

}
