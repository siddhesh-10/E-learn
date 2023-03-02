import { Component,OnInit } from '@angular/core';
import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit{
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
        this.router.navigate(['/provider/sign-in']);
      }
    });
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    });
  }
}
