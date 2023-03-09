import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import { GetCoursesService } from '../get-courses.service';
@Component({
  selector: 'app-student-dashbord',
  templateUrl: './student-dashbord.component.html',
  styleUrls: ['./student-dashbord.component.css']
})
export class StudentDashbordComponent implements OnInit{
  loading: boolean;
  user: IUser;
  isAuthenticated: boolean;
  courseData=[{
      CourseDetails:{
        title:String,
        videoUrl:String,
        description:String
      },
      ProviderID:String,
      CourseID:String
    },
  ];

  myCourses={Items:[{
    CourseDetails:{
      title:String,
      videoUrl:String,
      description:String
    },
    ProviderID:String,
    CourseID:String
  },]};

  dashbordData=[{
    CourseDetails:{
      title:String,
      videoUrl:String,
      description:String
    },
    ProviderID:String,
    CourseID:String
  },];
  flag:Boolean;

  constructor(private router: Router,private cognitoService: CognitoService,private getCourses:GetCoursesService, private http:HttpClient) {
    this.flag= false;
    this.loading = true;
    this.user = {} as IUser;
    this.isAuthenticated = false;
    this.courseData=
      [{
        CourseDetails:{
          title:String,
          videoUrl:String,
          description:String
        },
        ProviderID:String,
        CourseID:String
      },
      ];

      this.myCourses={Items:[{
        CourseDetails:{
          title:String,
          videoUrl:String,
          description:String
        },
        ProviderID:String,
        CourseID:String
      },]};
  }

  public ngOnInit(): void {
    this.myCourses.Items=[];
    this.dashbordData=[];
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
    }).then((data:any)=>{
    console.log("student id to access my courses: "+this.user.email);
    this.getCourses.myCourses(this.user.email).subscribe((myCourses:any)=>{
      this.myCourses=myCourses;
      console.log("my courses"+JSON.stringify(this.myCourses));

      this.getCourses.getAllCourses().subscribe((data: any) => {
        this.courseData=data;
        
        console.log(JSON.stringify(this.courseData));
        if(this.myCourses.Items.length>0){
          for(let Course of this.courseData){
            console.log("my courses"+JSON.stringify(this.myCourses));
            this.flag = true;
              for(let myCourse of this.myCourses.Items){
                if(Course.CourseID == myCourse.CourseID){
                  this.flag = false;
                  break;
                }
              }
              if(this.flag){
                  this.dashbordData.push(Course);
                  console.log(JSON.stringify(Course));
              }
          }
        }else{
          this.dashbordData=this.courseData;
        }
      });
    })
    this.loading=false;
  
}) 
  }
  public takeCourse(CourseID:any){
    this.getCourses.takeCourse(this.user.email,CourseID).subscribe((data:any)=>{
    
      console.log("courseid added in student table"+JSON.stringify(data));
      this.getCourses.updateProgress(this.user.email,CourseID).subscribe((data1:any)=>{
        console.log("record added in progess table"+JSON.stringify(data1));
      });
      this.router.navigate(["/student/my-courses"]);
    });
    
  }
  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/student/sign-in']);
    });
  }
}
