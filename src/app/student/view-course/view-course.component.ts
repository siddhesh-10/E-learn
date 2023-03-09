import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, } from '@angular/router';
import { Location } from '@angular/common';
import { IUser, CognitoService } from '../cognito.service';
import { GetCoursesService } from '../get-courses.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit{
  videoForm: FormGroup;
  percentage:any;
  video:any;
  videoPlaying:boolean=false;
  progess:number=0;
  loading: boolean;
  showmodal:boolean;
  user: IUser;
  count:number=0;
  isAuthenticated: boolean;
  message:String;
  videoFile:any;
  deletedata: any;
  course!: {
    ProviderId: string; CourseID: string; CourseDetails: {
      title: string;
      description: string;
      videoUrl: string;
    };
  };
 
 
  constructor(@Inject(DOCUMENT) document: Document,private http: HttpClient,private router: Router, private location:Location, private cognitoService: CognitoService,private getCourses:GetCoursesService) {
    this.loading = false;
    
    this.user = {} as IUser;
    this.isAuthenticated = false;
    this.showmodal=true;
    this.videoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      file: new FormControl(),
    });
    this.message="";
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
        this.course=stateData.Items;
        this.cognitoService.getUser()
        .then((user: any) => {
          this.user = user.attributes;
         
            
          
        
        this.getCourses.getProgess(this.course.CourseID,this.user.email).subscribe((data:any)=>{
          this.progess=data;
          this.video= document.getElementById('video');
          this.video.currentTime=((this.video.duration*this.progess)/100);
          
      });
    });
      }
      catch(err)
      {
        
      }
      
      
     
    });

   
   
  }
  
  public onTimeUpdate(){
  
    this.video= document.getElementById('video');
   
    this.percentage = Math.round((this.video.currentTime / this.video.duration) * 100);
    if(this.percentage>=95)
    {
      this.percentage=100;
    }
    var temp=this.progess;
    if((this.percentage-temp)>1)
    this.getCourses.updateProgressvalue(this.course.CourseID,this.user.email,this.percentage).subscribe((data:any)=>{
      this.progess=this.percentage;
      
  });
  }
 public videoplay()
 {
  if(this.progess==undefined)this.progess=0;
  this.video.currentTime=this.progess;
 }
 togglevideo(){
  if(!this.videoPlaying){
    this.video.play();
    this.videoPlaying = true;
  }else{
    this.video.pause();
    this.videoPlaying = false;
  }
}
  onFileSelect(event: any) {
    this.message="";
    if (event.target.files.length > 0) {
      
      this.videoFile = event.target.files[0];
      const title= this.videoForm.get('title');
      const description=this.videoForm.get('description');
      
      // this.videoForm.get('file').setValue(file);
      this.videoForm.setValue
      {
        title:title;
        description:description;
        file:this.videoFile;
      }
    }
  }
  public completeCourse()
  {
    
    this.getCourses.updateProgressvalue(this.course.CourseID,this.user.email,100).subscribe((data:any)=>{
      this.progess=this.percentage;
      
      
    });
    }


  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/student/sign-in']);
    });
  }
}