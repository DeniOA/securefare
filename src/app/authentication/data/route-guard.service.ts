import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
import {loginApiService } from '../login2/services/loginapi.service';

import { CookieService } from 'ngx-cookie-service';

import { appConfig } from '../../app.config';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService  implements CanActivate{

  public userGroup = this.cookieService.get('user_g');
  public isAllowed = false;

  constructor(public _loginApiService: loginApiService, private router: Router, public cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    this.userGroup = this.cookieService.get('user_g');
      if (Number(this.userGroup) == 1) {//SecureID  
        switch (route.routeConfig.path) {
          case 'dashboard':
            { this.isAllowed = true; break; }
          case 'profile':
            { this.isAllowed = true; break; }
        }
        this._loginApiService.allowRoutes();
        return this.isAllowed;
      }   else if (Number(this.userGroup) == 8) {//Staff
        //this.auth.userGroup;
        switch (route.routeConfig.path) {
          
          case 'dashboard':
            { this.isAllowed = true; break; }
          case 'profile':
            { this.isAllowed = true; break; }
      }
        if (this.isAllowed) {
          this._loginApiService.allowRoutes();
          return this.isAllowed;
        } else {
          this.router.navigate(['not-found']);
          return this.isAllowed;
        }
      
      }  else {
        return false;
      }  
      

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
      this.userGroup = this.cookieService.get('user_g');     
      if (Number(this.userGroup) == 1) {//SecureID        
        switch (route.routeConfig.path) {
         
          case 'dashboard':
            { this.isAllowed = true; break; }
          case 'profile':
            { this.isAllowed = true; break; }
         }
         this._loginApiService.allowRoutes();
         return this.isAllowed;

         } else if (Number(this.userGroup) == 8) {//Staff
        //this.auth.userGroup;
        switch (route.routeConfig.path) {
         
          case 'dashboard':
            { this.isAllowed = true; break; }
          case 'profile':
            { this.isAllowed = true; break; }
         
        }
        if (this.isAllowed) {
          this._loginApiService.allowRoutes();
          return this.isAllowed;
        } else {
          this.router.navigate(['not-found']);
          return this.isAllowed;
        }
      } 
      else {
        return false;
      }      

    }

  }

