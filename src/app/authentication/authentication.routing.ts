import { Routes } from '@angular/router';

import { NotFoundComponent } from './404/not-found.component';
import { LockComponent } from './lock/lock.component';

import { Login2Component } from './login2/login2.component';
import { AuthenticateTokenComponent } from './authenticate-token/authenticate-token.component';
import { Signup2Component } from './signup2/signup2.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CanActivate } from '@angular/router/src/utils/preactivation';
// import { AuthGuard } from './auth.guard';


export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'authenticate-token/:id/:token',
        component: AuthenticateTokenComponent,
        data: {
          title: 'Authenticate Token'
        }
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'lock',
        component: LockComponent
      },

      {
        path: 'login',
        component: Login2Component,

      },

      {
        path: 'signup',
        component: Signup2Component
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
    ]
  }
];
