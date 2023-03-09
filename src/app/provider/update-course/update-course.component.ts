import { Component,OnInit } from '@angular/core';
import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient ,HttpHeaders,HttpEvent, HttpEventType,HttpResponse} from '@angular/common/http';
import { GetCoursesService } from '../get-courses.service';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit{
  videoForm: FormGroup;
  loading: boolean;
  progress: number = 0;
  showmodal:boolean;
  user: IUser;
  isAuthenticated: boolean;
  message:String;
  videoFile:any;
  deletedata: any;
  progressTable:any;
  course!: {
    ProviderId: string; CourseID: string; CourseDetails: {
      title: string;
      description: string;
      videoUrl: string;
    };
  };
 
 
  constructor(@Inject(DOCUMENT) document: Document,private http: HttpClient,private location:Location,private router: Router,private cognitoService: CognitoService, private deleteCourses:GetCoursesService ) {
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
        this.router.navigate(['/provider/sign-in']);
      }
      const stateData=this.location.getState();

      try{
        // @ts-ignore
        this.course=stateData!.Items;
        this.videoForm.get('title')?.setValue(this.course.CourseDetails.title);
        this.videoForm.get('description')?.setValue(this.course.CourseDetails.description);
        var myVideo = document.getElementsByTagName('video')[0];
        myVideo.src = this.course.CourseDetails.videoUrl;
        myVideo.load();
        myVideo.play();
        console.log("this is video "+myVideo);
        console.log("this is course id for getting all students progress:"+this.course.CourseID);
        this.deleteCourses.getProgress(this.course.CourseID).subscribe((data:any)=>{
          this.progressTable=data;
          console.log("this is progess data: "+JSON.stringify(this.progressTable));
          this.loading=false;
        });
      }
      catch(err)
      {
        console.log(err);
      }
      
      console.log("data from component"+JSON.stringify(this.course));
     
    });

    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
     
        console.log(JSON.stringify(this.user.email));
      });
   
  }

  onFileSelect(event: any) {
    this.message="";
    if (event.target.files.length > 0) {
      
      this.videoFile = event.target.files[0];
      const title= this.videoForm.get('title');
      const description=this.videoForm.get('description');
      console.log(this.videoFile+" this is file");
      // this.videoForm.get('file').setValue(file);
      this.videoForm.setValue
      {
        title:title;
        description:description;
        file:this.videoFile;
      }
    }
  }

  public Delete(){
    console.log("ProviderID IN deleTE :"+this.user.email);
    this.deleteCourses.deleteCourses(this.user.email, this.course.CourseID).subscribe((data: any) => {
      console.log("deleted data"+JSON.stringify(data));
      this.deletedata = data;

      this.router.navigateByUrl("/provider/dashbord");
      console.log("deleted data"+JSON.stringify(this.deletedata));
    });
  }

  onClose(){
       this.router.navigate(['/provider/dashbord']);
  }
  async onSubmit() {
    const formData = new FormData();
    this.loading=true;
    this.message="";
    let body={
      title:this.videoForm.get('title')!.value,
      description:this.videoForm.get('description')!.value,
      file: this.videoFile,
      ProviderID:this.user.email
    }
    console.log(JSON.stringify(body));
    formData.append('title', body.title);
    formData.append('description', body.description);
    // formData.append('file', body.file);
    formData.append('ProviderID',this.user.email);
    formData.append('CourseID', this.course.CourseID)
    console.log("this is courseid: "+formData.get('CourseID'));
    console.log('this is video'+this.videoFile);
    var modal = document.querySelector(".modal");
    if(this.videoFile==undefined)
    {
      this.http.put<any>('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/courses', formData).subscribe(data => {
    console.log(data);
    this.progress=100;
    this.loading=false;
    //this.showmodal=false;
   
   
    // this.router.navigate(['/provider/dashbord']);
    });
    }
    else
    {
      const { content, filename, contentType } =this.videoFile;
      const videoKey = `videos/${body.ProviderID}/${body.title}.mp4`;
      const bucketName = 'courseswebsite';
  
      const uploadParams = {
        Bucket: bucketName,
        Key: videoKey,
        Body: this.videoFile, // Use the decoded video data as the Body parameter
        ContentType: contentType,
       Conditions: [
                ['acl', 'public-read']   
            ],
            ACL: 'public-read'
      };
      const bucket = new S3(
        {
            accessKeyId: environment.s3.accesskey,
            secretAccessKey: environment.s3.secret,
            region: 'ap-northeast-1'
        }
    );
    console.log(content+" file c"+this.videoFile+" "+contentType);
    bucket.upload(uploadParams).on('httpUploadProgress',  (evt) => {
      console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      this.progress = Math.round(100 * evt.loaded / evt.total);
  }).send( (err: any, data: any) => {
      if (err) { 
          console.log('There was an error uploading your file: ', err);
          return false;
      }
      console.log('Successfully uploaded file.', data);
      formData.append('file', data.Location);
      this.http.post<any>('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/courses', formData,{
        reportProgress: true,
        observe: 'events',
    })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
    
          
        } else if (event instanceof HttpResponse) {
    
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
         
          this.loading=false;
         
          // this.router.navigate(['/provider/dashbord']);
        }
           
            
        }
      )
      return true;
  });
    }
    
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    });
  }
}
