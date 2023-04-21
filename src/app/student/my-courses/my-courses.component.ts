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
  help:boolean=false;
  onHelp(){
    if(this.help==false){
      this.help=true;
    }
    else if(this.help==true){
      this.help=false;
    }
    
  }
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
         // console.log(this.course);
        }
        catch(err)
        {
          console.log(err);
        }
      });
      this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
       // console.log("this is studentId: "+this.user.email);
        this.getCourses.myCourses(this.user.email).subscribe((data:any)=>{
          //console.log(JSON.stringify(data));
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