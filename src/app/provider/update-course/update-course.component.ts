import { Component,OnInit } from '@angular/core';
import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit{
  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  videoData:any;
  course!: {
    ProviderId: string; CourseID: string; CourseDetails: {
      title: string;
      description: string;
      videoUrl: string;
    };
  };
 
 
  constructor(private http: HttpClient,private location:Location,private router: Router,private cognitoService: CognitoService) {
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
      const stateData=this.location.getState();

      try{
        // @ts-ignore
        this.course=stateData!.Items;
      }
      catch(err)
      {
        console.log(err);
      }
      
      console.log("data from component"+JSON.stringify(this.course));
     
    });
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    });
  }
}
