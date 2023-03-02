import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VideoUploadService } from '../video-upload.service';

import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  
  videoForm: FormGroup;
  loading: boolean;
  user: IUser;
  message:String;
  videoFile:any;
  isAuthenticated: boolean;
  constructor(private videoUploadService: VideoUploadService,private router: Router,private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
    this.isAuthenticated = false;
    this.videoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      file: new FormControl(),
    });
    this.message="";
  }

  public toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
  
  public ngOnInit(): void {
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

  async onSubmit() {
    const formData = new FormData();
    this.message="";
    let body={
      title:this.videoForm.get('title')!.value,
      description:this.videoForm.get('description')!.value,
      file: await this.toBase64(this.videoFile),
      ProviderID:this.user.email
    }
    console.log(JSON.stringify(body));
    // formData.append('title', this.videoForm.get('title')!.value);
    // formData.append('description', this.videoForm.get('description')!.value);
    // formData.append('file', this.videoForm.get('file')!.value);
    // formData.append('ProviderID', this.user.email);
  //   if( formData.get('file')!=null &&  this.videoForm.get('file')!.valid)
  //   {
  //   const tempData=formData;
   
  //  }
  //  else
  //  {
  //   console.log("upload all details");
  //   this.message="upload all details";
  //  }
   console.log(this.videoForm.get('file')+" dd");
   this.videoUploadService.uploadVideo(body).subscribe(res => {
     console.log(res);
   });
  }


  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    });
  }



}
