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
    
    this.getCourses.myCourses(this.user.email).subscribe((myCourses:any)=>{
      this.myCourses=myCourses;
      

      this.getCourses.getAllCourses().subscribe((data: any) => {
        this.courseData=data;
        
        
        if(this.myCourses.Items.length>0){
          for(let Course of this.courseData){
            
            this.flag = true;
              for(let myCourse of this.myCourses.Items){
                if(Course.CourseID == myCourse.CourseID){
                  this.flag = false;
                  break;
                }
              }
              if(this.flag){
                  this.dashbordData.push(Course);
                  
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
    
      
      this.getCourses.updateProgress(this.user.email,CourseID).subscribe((data1:any)=>{
        
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
