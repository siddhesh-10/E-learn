import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {

  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  message:String;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.message="";
  }

  public signUp(): void {
    this.loading = true;
    this.message="";
    this.cognitoService.signUp(this.user)
    .then(() => {
      this.loading = false;
      this.isConfirm = true;
    }).catch((err) => {
      this.loading = false;
      this.message=err;
    });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    }).catch(() => {
      this.loading = false;
    });
  }

}