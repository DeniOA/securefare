// import { Component } from '@angular/core';
// import { HttpClient, HttpHeaders} from "@angular/common/http";
// import { ActivatedRoute } from "@angular/router";
// import { Location } from "@angular/common";
// import { map, filter, switchMap } from 'rxjs/operators';


// @Component({
//   templateUrl: 'profile.component.html'
// })
// export class ProfileComponent {
//   private id: string;
//   public input: any;
//   public entries: any;

//   public constructor( private http: HttpClient, private route: ActivatedRoute, private location: Location ) {
//     this.input = {
//       "firstname": "",
//       "lastname": "",
//       "email": "",
//       "sex": "",
//       "mobile": "",
//       "image": "",
//       "username": "",
//       "age": "",
//       "security_questions": "",
//       "answer": ""
//   };
//   }

//   public ngOnInit() {

//     let id = parseInt(this.route.snapshot.paramMap.get('id'));
//     return this.http.get(`http://104.248.174.205/ticket/profile/${id}/`)

//          .subscribe(result => {

//              this.entries= result;

//  });

//   }




//   public save() {
//     if(this.input.firstname && this.input.lastname) {
//         let headers = new HttpHeaders({
//             "content-type": "application/json",
//             "authorization": "Bearer " + this.id
//         });
//         let options = { headers: headers }
//         this.http.patch(`http://104.248.174.205/user/update/${this.id}/`, JSON.stringify(this.input), options)

//             .subscribe(result => {
//                 this.location.back();
//             });
//     }
// }
// }

import { Component, OnInit } from '@angular/core';
import { loginApiService } from '../../authentication/login2/services/loginapi.service';
import { ProfileService } from '../../shared/services/profile.service';

//import {MatDialog} from '@angular/material/dialog';

import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router'
import {Observable} from 'rxjs/Observable';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/services/error.message.config';
import { IProfile } from '../../shared/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  firstname;
  lastname;
  username;
  security_questions;
  answer;
  phone;
  email;
  sex;
  image;
  editForm: NgForm;
  profileDetails: IProfile[];
  constructor(public _loginApiService: loginApiService, public cookieService: CookieService, public pService: ProfileService, private route: ActivatedRoute,private router: Router ) { }

  public ngOnInit(): void {
    this.pService.isLoaded = false;
    if (Number(this.cookieService.get('user_g')) === 1 || Number(this.cookieService.get('user_g')) === 8) {
      this.showAddEditFunctions = true;
    }



  //   this.pService.getItems();
  //   WebcamUtil.getAvailableVideoInputs()
  //     .then((mediaDevices: MediaDeviceInfo[]) => {
  //       this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
  //     });
  // }


    const id = this.route.snapshot.paramMap.get("id");

    this.pService.getProfile(+id)
    .subscribe (
      data =>
      {
        this.profileDetails= data;
        console.log(this.profileDetails);
      }
    );


    this.pService.editDetails(this.editForm).subscribe((res) => {

      this.profileDetails = res;
      console.log(this.profileDetails)
      console.log(res);
      // this.getItems();
      // this.isUploading = false;
      alert('Profile successfully edited');
      window.location.reload();
    },
      (err: any) => {
        // this.isUploading = false;
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); this._loginApiService.refreshJWT(); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
          case 413: { alert(ERROR_MESSAGE_DICTIONARY.e413); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
      });

    // this.profileDetails = this.pService.newProfileDetails;
    // console.log(this.profileDetails)

    }



  public ngOnDestroy() {
    this.pService.viewProfileContents();
  }

  showAddEditFunctions: boolean;

  // toggle webcam on/off
  public showWebcam = false;
  public useWebcamCheckbox = false;
  public showSnapshot = false;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };


  public selectedImageFile: File = null;
  public testImageFile: File = null;
  public imageUrl;

  public loginInvalid = false;
  public mouseoverLogin = false;
  // public loginForm: FormGroup;
  public timer;


  color = 'primary';
  mode = 'indeterminate';
  value = 50;


  /*
  public ngAfterContentInit(): void {
      //this.pService.apiData = null;
      this.pService.getItems();
  }*/

  /*public ngAfterContentChecked(): void {
     // this.pService.apiData = null;
     //this.pService.getItems();

  }*/

  logout(){
    this.pService.apiData = null;
    this._loginApiService.logout();
  }


    public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();



  public triggerSnapshot(): void {
    this.trigger.next();
    this.showSnapshot = true;
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    if (this.showSnapshot === true) {
      this.showSnapshot = !this.showSnapshot;
    }
    //this.dialog.open(WebcamDialogComponent, { data: { name: 'angular lessons' } });
  }

  public toggleCheckbox(): void {
    this.useWebcamCheckbox = !this.useWebcamCheckbox;
    //this.dialog.open(WebcamDialogComponent, { data: { name: 'angular lessons' } });
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }


  onFileSelected(files: FileList){
    this.selectedImageFile = files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
        this.testImageFile = event.target.result.split(',')[1];
    }
    reader.readAsDataURL(this.selectedImageFile);
  }

  editDetails(editForm: NgForm) {
    this.pService.editDetails(editForm.value);//, this.testImageFile
    editForm.reset();
  }



  changePasswordII(changePasswordForm: NgForm) {
    this.pService.isUploading = true;
    this.pService.changePasswordII(changePasswordForm.value.oldPassword, changePasswordForm.value.newPassword).subscribe((res) => {
      this.pService.isUploading = false;
      ////console.log(res);
      alert('Password Successfully Changed');
      // this.router.navigate(['login/']);
    },
      (err: any) => {
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.e400); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.e401); this._loginApiService.refreshJWT(); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.e403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.e404); break; }
          case 413: { alert(ERROR_MESSAGE_DICTIONARY.e413); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.e415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
        this.pService.isUploading = false;
      });
  }



}


