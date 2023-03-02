import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { VideoUploadService } from './video-upload.service';
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})


export class CreateCourseComponent implements OnInit {
  videoForm!: FormGroup;

   constructor(private videoUploadService: VideoUploadService) {}

  ngOnInit() {
    this.videoForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      file: new FormControl('')
    });
    
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.videoForm.get('file')!.setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.videoForm.get('title')!.value);
    formData.append('description', this.videoForm.get('description')!.value);
    formData.append('file', this.videoForm.get('file')!.value);
    console.log(JSON.stringify(formData));
    this.videoUploadService.uploadVideo(formData).subscribe(res => {
      console.log(res);
     });
  }
}