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

    deleteCourses(ProviderID: any, CourseID: any): Observable<any> {
      console.log("ProviderID: "+ProviderID+"  CourseID: "+CourseID);
      let params = new HttpParams();
      params = params.append("ProviderID", ProviderID);
      params = params.append("CourseID", CourseID);
      return this.http.delete('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/courses', { params: params });
  
    }

    getProgress(CourseID:any):Observable<any>{
      console.log("course id in get progress at provider side:"+CourseID);
      let params = new HttpParams();
      params = params.append("CourseID",CourseID);
      return this.http.get('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/enrolledstudent', { params: params });
    }
    
}
