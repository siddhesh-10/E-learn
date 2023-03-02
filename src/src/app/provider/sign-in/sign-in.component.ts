import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {

  loading: boolean;
  user: IUser;
  message:String;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
    this.message="";
  }

  public signIn(): void {
    this.loading = true;
    this.message="";
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.router.navigate(['/provider/profile']);
    }).catch((err) => {
      this.loading = false;
      this.message=err;
    });
  }

}