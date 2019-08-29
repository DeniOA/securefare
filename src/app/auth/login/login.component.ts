import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  login(){
    // this.authService.login(this.loginForm.value);
    // this.auth.isActiveCheck(loginForm.value.username, loginForm.value.password);
    // this.auth.getJWT(loginForm.value.username, loginForm.value.password);
    //this.router.navigate(['profile/profile'])
  }

  ngOnInit() {
  }

}
