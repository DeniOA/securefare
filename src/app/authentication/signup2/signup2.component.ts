import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { loginApiService } from '../login2/services/loginapi.service';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

// import { Posts } from './classes/posts';

@Component({
  selector: 'app-signup',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css'],
  providers: [loginApiService]
})
export class Signup2Component implements OnInit {

  loginInvalid: boolean;
  registerInfo;
  isDirty: boolean;
  newUser;

  registrationForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor(
    private _loginApiService: loginApiService,
    private router: Router,
    private fb: FormBuilder
    ) {}

  // objPosts:Posts;
  ngOnInit() {

    // this.register = {
    //   username: '',
    //   password: '',
    //   email: '',
    //   first_name: '',
    //   last_name: '',
    // }

    //   var opost = new Posts();

    //   opost.username = '' ;
    //   opost.password = '';
    //   opost.email = '';
    //   opost.first_name = '';
    //   opost.last_name = '';


    // this._signupApiService.post(opost)
    // .subscribe
    // (
    //   data =>
    //   {
    //     this.objPosts = data;
    //     console.log(data);
    //   }
    // )

  }

  // onRegister(form: NgForm) {

  //   const username = form.value.username;
  //   const password = form.value.password;
  //   const email = form.value.email;
  //   const first_name = form.value.first_name;
  //   const last_name = form.value.last_name;

  //   this.register = {

  //     username: username,
  //     password: password,
  //     email: email,
  //     first_name: first_name,
  //     last_name: last_name,
  //   };


  //   console.log(this.register);
  //   this._signupApiService.registerUser(this.register).subscribe(
  //     response => {
  //       alert('User ' +this.register.username+ ' has been created');

  //       this.router.navigate(['/login']);

  //     },
  //     error =>  console.log('error', error)
  //   );
  // }


  register(){

    this._loginApiService.register(this.registrationForm.value);
    // this.auth.isActiveCheck(loginForm.value.username, loginForm.value.password);
    // this.auth.getJWT(loginForm.value.username, loginForm.value.password);
    //this.router.navigate(['profile/profile'])
  }





  }




