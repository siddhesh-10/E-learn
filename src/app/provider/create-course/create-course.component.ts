import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { VideoUploadService } from '../video-upload.service';
import { HttpClient ,HttpHeaders,HttpEvent, HttpEventType,HttpResponse} from '@angular/common/http';
import { IUser, CognitoService } from '../cognito.service';
import { Router } from '@angular/router';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  progress: number = 0;
  videoForm: FormGroup;
  loading: boolean;
  user: IUser;
  message:String;
  videoFile:any;
  isAuthenticated: boolean;
  help:boolean=false;
  onHelp(){
    if(this.help==false){
      this.help=true;
    }
    else if(this.help==true){
      this.help=false;
    }
    
  }
  constructor(private http: HttpClient,private videoUploadService: VideoUploadService,private router: Router,private cognitoService: CognitoService) {
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
      //console.log(this.videoFile+" this is file");
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
    this.loading=true;
    this.message="";
    let body={
      title:this.videoForm.get('title')!.value,
      description:this.videoForm.get('description')!.value,
      file: this.videoFile,
      ProviderID:this.user.email
    }
    //console.log(JSON.stringify(body));
    formData.append('title', body.title);
    formData.append('description', body.description);
    
    formData.append('ProviderID',body.ProviderID);
     
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
  //console.log(content+" file c"+this.videoFile+" "+contentType);
  bucket.upload(uploadParams).on('httpUploadProgress',  (evt) => {
   // console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
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
        this.router.navigate(['/provider/dashbord']);
      }
         
          
      }
    )
    return true;
});

 

  }


  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/provider/sign-in']);
    });
  }



}
// const AWS = require('aws-sdk');
// const s3 = new AWS.S3();
// const docClient = new AWS.DynamoDB.DocumentClient();

// exports.handler = async (event) => {
//   const bucketName = 'courseswebsite';
//   //const requestBody = JSON.parse(event.body);
//   const multipart =  require('body-parser');

// const requestBody = multipart.parse(event) // spotText === true response file will be Buffer and spotText === false: String
//   console.log("This is request body",requestBody);
//   const ProviderID = requestBody.ProviderID;

//   const videoKey = `videos/${ProviderID}/${requestBody.title}.mp4`;
//   console.log(videoKey);

//   console.log("This is file ",requestBody.file);

//   // Decode the base64-encoded video file
//   const videoData =requestBody.file;
//    console.log("videoData "+videoData);
//   const d = new Date();
//   const courseId = ProviderID + d;
  
 
//   const putParams = {
//     TableName: 'CoursesData',
//     Item: {
//       ProviderID: requestBody.ProviderID,
//       CourseID: courseId,
//       CourseDetails: {
//         title: requestBody.title,
//         description: requestBody.description,
//         videoUrl: `https://${bucketName}.s3.amazonaws.com/${videoKey}`,
//       },
//     },
//   };
  
//   const uploadParams = {
//     Bucket: bucketName,
//     Key: videoKey,
//     Body: videoData, // Use the decoded video data as the Body parameter
//     ContentType: 'video/mp4',
//    Conditions: [
//             ['acl', 'public-read']   
//         ],
//         ACL: 'public-read'
//   };

//   try {
//     const uploadResult = await s3.upload(uploadParams).promise();
//     console.log("This is Upload Result",JSON.stringify(uploadResult));
//     putParams.Item.CourseDetails.videoUrl = uploadResult.Location; // Update video URL with S3 object URL
//     const dynamoResult = await docClient.put(putParams).promise();
//     console.log("This is Dynamo Result", dynamoResult);
//     return {
//       statusCode: 200,
//       headers:{
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin':'*',
//         'Access-Control-Allow-Headers': 'Content-Type',
//         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
//       },
//       body: JSON.stringify({
//         message: dynamoResult,
//       }),
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: 'Error uploading video',
//       }),
//     };
//   }
// };
