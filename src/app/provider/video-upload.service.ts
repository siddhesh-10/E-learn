import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoUploadService {

  constructor(private http: HttpClient) {}

  uploadVideo(item:any):Observable<any> {
    return this.http.post('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/courses', item);
  }
}

