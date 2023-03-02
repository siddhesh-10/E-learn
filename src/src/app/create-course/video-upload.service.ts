import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  constructor(private http: HttpClient) {}

  uploadVideo(formData: FormData) {
    return this.http.post('/api/upload', formData);
  }
}
