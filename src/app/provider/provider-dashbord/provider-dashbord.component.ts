import { Component, OnInit } from '@angular/core';

import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import { GetCoursesService } from '../get-courses.service';
@Component({
  selector: 'app-dashbord',
  templateUrl: './provider-dashbord.component.html',
  styleUrls: ['./provider-dashbord.component.css']
})

export class ProviderDashbordComponent implements OnInit{
  loading: boolean=true;
  user: IUser;
  isAuthenticated: boolean;
  courseData={
    Items:[{
      CourseDetails:{
        title:String,
        videoUrl:String,
        description:String
      },
      ProviderID:String,
      CourseID:String
    },
    ]
  };
  myArray: any[]=[];
  objectKeys = Object.keys;
  constructor(private router: Router,private cognitoService: CognitoService,private getCoursesService:GetCoursesService) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAuthenticated = false;
    this.courseData={
      Items:[{
        CourseDetails:{
          title:String,
          videoUrl:String,
          description:String
        },
        ProviderID:String,
        CourseID:String
      },
      ]
    };
  }

  public ngOnInit(): void {
    this.courseData={Items: []};
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
      if(!this.isAuthenticated)
      {
        this.router.navigate(['/provider/sign-in']);
      }
    });
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
      this.getCoursesService.getCourses(user.attributes.email).subscribe((data: any) => {
        this.courseData=data;
         this.myArray = Object.keys(data).map(key => ({key, value: data[key]}));
        
        this.loading=false;
      });
    });
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    });
  }
}
