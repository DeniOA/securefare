import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import { loginApiService } from '../login2/services/loginapi.service';
import { appConfig } from '../../app.config';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public isAuthenticated = Boolean(this.cookieService.get('isAuth'));

    public dashboardAllowed: boolean = false; public profileAllowed: boolean = false; 
  
    public userGroup = this.cookieService.get('user_g');
  
    

  constructor( public _loginApiService: loginApiService, private router: Router, public cookieService: CookieService ) { }

  canActivate() : boolean{
    const logged = !!this._loginApiService.isLoggedIn()
    if(!logged) {
      this.router.navigate(['/login'])
    } return logged;
  }
  


}
