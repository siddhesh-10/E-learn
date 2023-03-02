import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {
  

  constructor(private http: HttpClient) { }

 getCourses(item:any):Observable<any> {
  console.log("provider id:"+item);
  let params = new HttpParams();
  params = params.append("ProviderID", item);
    return this.http.get('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/courses', { params: params });}
    
}
