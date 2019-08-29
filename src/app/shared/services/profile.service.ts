import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { appConfig } from '../../../app/app.config';
import { loginApiService } from '../../authentication/login2/services/loginapi.service';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/services/error.message.config';
import {IProfile} from '../models/profile';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  updateDetails: any;
  newApiData: any;

  profileDetails : IProfile[];
  newProfileDetails: any;


  constructor(private http: HttpClient, public _loginApiService: loginApiService, public cookieService: CookieService) { }

  private serviceUrl: string = 'id/users/';
  public apiData: any;
  public apiStaffData: any;

  public mostOrderedMeal: any = {
    food: 'Nothing',
    times_ordered: 0,
  };
  public leastOrderedMeal: any = {
    food: 'Nothing',
    times_ordered: 0,
  };


  public isLoaded: boolean = false;
  public isUploading: boolean = false;
  public isStaff: boolean = false;
  public isComp = false;

  public staffDataIsLoaded: boolean = false;

  public currentProfileID = this.cookieService.get('user_id'); //this.savedUser.id
  public currentUsername = this.cookieService.get('username'); //this.savedUser.id
  private profileApiUrl: string = 'ticket/profile/';
  public profileUrl = 'http://104.248.174.205/ticket/profile/';  

  public showProfileContents: boolean = true;
  public showEditProfile: boolean = false;

  public httpGETOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      // 'X-CSRFToken': this.cookieService.get('csrftoken'),
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

  getProfile(id:number ):Observable<IProfile[]> {
    let param = '';
    if(id) {
      param = id+"/";
    }
    return this.http.get<IProfile[]>(`http://104.248.174.205/ticket/profile/${this.currentProfileID}/`);
  }

  // getData(){
  //   this.currentProfileID = this.cookieService.get('id'); //this.savedUser.id
  //   this.currentUsername = this.cookieService.get('username');
  //   console.log(this.currentUsername);
  //   this.profileUrl = `http://104.248.174.205/ticket/profile/${this.currentProfileID}`;  
  //   return this.http.get<any[]>(this.profileUrl, this.httpGETOptions);
  // }
//   getProfileUser(){
//     this.isComp = JSON.parse(this.cookieService.get('isComp'));
//     return this.getProfile('id').subscribe(
//       (data) => {
//         this.apiData = data;
//         console.log(this.apiData);
//         if (this.apiData.is_staff.toLowerCase() === 'sta' ) {
//           this.isStaff = true;
//           this.getStaffDataItems();
//         } else {
//           this.isStaff = false;
//         }
//         this.isLoaded = true;
// console.log(this.apiData);
//     },
//       (err) => {
//         console.log(err);
//         switch (err.status) {
//           case 400: { this.errorMessage = this.defaultErrorMessage; }
//           case 401: { this._loginApiService.refreshJWT(); break; }
//         }
//         alert(err.error);
//       }   
//     );
//   }

  editDetails(editForm) {//, image
    this.isUploading = true;
    let updateDetails = {
      sex: editForm.sex,
      security_questions: editForm.security_questions,
      answer: editForm.answer,
      email: editForm.email,
      firstname: editForm.firstname, lastname: editForm.lastname,
      // image: image, //email: editForm.email,
      username: this.currentUsername,
      phone: editForm.phone,
    };
    console.log(updateDetails);
    return this.http.patch<any>(`http://104.248.174.205/user/update/${this.currentProfileID}/`, this.httpNotGETOptions)
    
  }


  changePasswordII(oldPassword, newPassword) {
    this.isUploading = true;
    return this.http.put<any>(appConfig.apiUrl + 'auth/change/p/', {  old_password: oldPassword, new_password: newPassword }, this.httpNotGETOptions);
  }


  viewProfileContents() {
    this.showProfileContents = true;
    this.showEditProfile = false;
  }

  viewEditProfile() {
    this.showProfileContents = false;
    this.showEditProfile = true;
  }


}
