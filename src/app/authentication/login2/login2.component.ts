import { Component, OnInit, AfterViewInit } from '@angular/core';
import {  NgForm, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginApiService } from './services/loginapi.service';
import { appConfig } from '../../app.config';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/error.message.config';

@Component({
  //selector: 'app-login',
  templateUrl: './login2.component.html'
})
export class Login2Component implements OnInit {

  // ngAfterViewInit() {
  //   $(function() {
  //     $('.preloader').fadeOut();
  //   });
  //   $('#to-recover').on('click', function() {
  //     $('#loginform').slideUp();
  //     $('#recoverform').fadeIn();
  //   });
  // }

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

public projectTitle = appConfig.title;

  loginInvalid;
  mouseoverLogin;

  public timer;


  public forgotPasswordInvalid = false;

  username;
  password;


  public errorMessage: string = 'Incorrect Username or Password.';

  // public loginForm: FormGroup = new FormGroup(
  //   controls: {
  //     username: string,
  //   }
  // );


  //public errorMessage: string = 'Incorrect Username or Password.';

  constructor(
    private fb: FormBuilder,
    public _loginApiService: loginApiService,
    private router: Router
    ) { }

  ngOnInit() {
  }



  onLogin(){
    this._loginApiService.login(this.loginForm.value);
    // this.auth.isActiveCheck(loginForm.value.username, loginForm.value.password);
    // this.auth.getJWT(loginForm.value.username, loginForm.value.password);
    //this.router.navigate(['profile/profile'])
  }

  timedErrorMessage() {
    this.timer = setTimeout(() => {
      //console.log('Logging out due to inactivity.');
      this.loginInvalid = true;
    }, 3000);
  }





  sendForgotPasswordRequest(forgotPasswordForm: NgForm) {
    this._loginApiService.sendForgotPasswordRequest(forgotPasswordForm.value.email).subscribe((res) => {
      this._loginApiService.isUploading = false;
      alert('Please check your email inbox for further instructions');
    },
      (err: any) => {
        this.forgotPasswordInvalid = true;
        //console.log(err);
        switch (err.status) {
          case 400: { alert(ERROR_MESSAGE_DICTIONARY.passwordE401); break; }
          case 401: { alert(ERROR_MESSAGE_DICTIONARY.passwordE401); break; }
          case 403: { alert(ERROR_MESSAGE_DICTIONARY.passwordE403); break; }
          case 404: { alert(ERROR_MESSAGE_DICTIONARY.passwordE404); break; }
          case 415: { alert(ERROR_MESSAGE_DICTIONARY.passwordE415); break; }
          case 500: { alert(ERROR_MESSAGE_DICTIONARY.e500); break; }
          case 503: { alert(ERROR_MESSAGE_DICTIONARY.e503); break; }
        }
        this._loginApiService.isUploading = false;
      });
    forgotPasswordForm.reset();
    //this.router.navigate(['profile/profile'])
  }
}




// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder , ReactiveFormsModule} from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login2.component.html',
//   styleUrls: ['./login2.component.css']
// })
// export class Login2Component implements OnInit {

//   loginForm: FormGroup;

//   constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       username: [''],
//       password: ['']
//     });
//   }

//   get f() { return this.loginForm.controls; }

//   login() {
//     this.authService.login(
//       {
//         username: this.f.username.value,
//         password: this.f.password.value
//       }
//     )
//     .subscribe(success => {
//       if (success) {
//         this.router.navigate(['/dashboard']);
//       }
//     });
//   }

// }
