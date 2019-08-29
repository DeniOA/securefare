import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { loginApiService } from '../login2/services/loginapi.service';
import { appConfig } from '../../app.config';
import { ERROR_MESSAGE_DICTIONARY } from '../../shared/error.message.config';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  public projectTitle = appConfig.title;

  public forgotPasswordInvalid = false;
  public mouseoverLogin = false;
  public loginForm: FormGroup;
  public timer;
  loginInvalid: boolean;
  public errorMessage: string = 'Incorrect Username or Password.';

  constructor(public _loginApiService: loginApiService, private router: Router) { }

  ngOnInit() {

  }

  sendForgotPasswordRequest(forgotPasswordForm: NgForm) {
    this._loginApiService.sendForgotPasswordRequest(forgotPasswordForm.value.email).subscribe((res) => {
      // this._loginApiService.isUploading = false;   
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
    this.router.navigate(['/login'])
  }

  timedErrorMessage() {
    this.timer = setTimeout(() => {
      //console.log('Logging out due to inactivity.');
      this.forgotPasswordInvalid = true;
    }, 3000);
  }

}

