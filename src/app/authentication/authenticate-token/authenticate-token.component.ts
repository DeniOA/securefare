import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { loginApiService } from '../login2/services/loginapi.service';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-authenticate-token',
  templateUrl: './authenticate-token.component.html',
  styleUrls: ['./authenticate-token.component.css']
})
export class AuthenticateTokenComponent implements OnInit {

  constructor( public _loginApiService: loginApiService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.authenticateToken();
  }

  public projectTitle = appConfig.title;
  
  public userID: number = null;
  public token: string = '';

  authenticateToken() {
    this.route.params.subscribe(params => {
      this.userID = params.id;
      this.token = params.token;
      console.log(params);
      this._loginApiService.authenticateToken(this.userID, this.token).subscribe((res) => {
        this._loginApiService.isUploading = false;
        //console.log(res);
        this._loginApiService.resetPasswordID = res.id;
        this.router.navigate(['change-password/']);
      },
        (err: any) => {
          // this.forgotPasswordInvalid = true;
          //console.log(err);
          alert('There was a problem resetting password.');
          this._loginApiService.isUploading = false;
        });
    });
  }
}
