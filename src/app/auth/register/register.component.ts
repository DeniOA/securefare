import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css', '../login/theme1.css']
})
export class RegisterComponent implements OnInit {

  registrationForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(){
    // console.log(this.registrationForm.value);
  this.authService.register(this.registrationForm.value);
  // this.auth.isActiveCheck(loginForm.value.username, loginForm.value.password);
  // this.auth.getJWT(loginForm.value.username, loginForm.value.password);
  // this.router.navigate(['profile/profile'])
}

}
