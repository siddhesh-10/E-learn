import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CognitoService, IUser } from '../cognito.service';
import { GetCoursesService } from '../get-courses.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit{
  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  myCourses={
    Items:[{
    CourseDetails:{
      title:String,
      videoUrl:String,
      description:String
    },
    ProviderID:String,
    CourseID:String
  },]};

  course={
    CourseDetails:{
      title:String,
      videoUrl:String,
      description:String
    },
    ProviderID:String,
    CourseID:String
  };
  constructor(private router: Router,private location: Location,private cognitoService: CognitoService,private getCourses:GetCoursesService, private http:HttpClient) {
    this.myCourses.Items=[];
    this.loading = true;
    this.user = {} as IUser;
    this.isAuthenticated = false;
    this.myCourses={
      Items:[{
      CourseDetails:{
        title:String,
        videoUrl:String,
        description:String
      },
      ProviderID:String,
      CourseID:String
    },]};

    this.course={
      CourseDetails:{
        title:String,
        videoUrl:String,
        description:String
      },
      ProviderID:String,
      CourseID:String
    };
    }
    public ngOnInit(): void {
      this.cognitoService.isAuthenticated()
      .then((success: boolean) => {
        this.isAuthenticated = success;
        if(!this.isAuthenticated)
        {
          this.router.navigate(['/student/sign-in']);
        }
        const stateData=this.location.getState();
        try{
          // @ts-ignore
          this.course=stateData!.Items;
          
        }
        catch(err)
        {
          
        }
      });
      this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
        
        this.getCourses.myCourses(this.user.email).subscribe((data:any)=>{
          
          this.myCourses=data;
          this.loading=false;
         });
      });
     
     
}
public signOut(): void {
  this.cognitoService.signOut()
  .then(() => {
    this.router.navigate(['/student/sign-in']);
  });
}
}