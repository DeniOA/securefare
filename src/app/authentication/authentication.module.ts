import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {TokenInterceptor} from './token.interceptor'

import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';


import { Signup2Component } from './signup2/signup2.component';
import { signupApiService } from './signup2/services/signupapi.service'; 

import {AuthGuardService} from './data/auth-guard.service'

import { AuthenticationRoutes } from './authentication.routing';
import { Login2Component } from './login2/login2.component';
import { loginApiService } from './login2/services/loginapi.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthenticateTokenComponent } from './authenticate-token/authenticate-token.component';
// import { AuthService } from './services/auth.service';
// import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  declarations: [
    NotFoundComponent,
    LockComponent,
    Signup2Component,
    Login2Component,
    ForgotPasswordComponent,
    AuthenticateTokenComponent
  ],
  providers: [signupApiService, loginApiService, AuthGuardService ]
})
export class AuthenticationModule {}
