import { Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  constructor(private router: Router,private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
      if(!this.isAuthenticated)
      {
        this.router.navigate(['/student/sign-in']);
      }
    });
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }
  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/student/sign-in']);
    });
  }
}