import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCoursesService {
  

  constructor(private http: HttpClient) { }
    getAllCourses():Observable<any>{
      return this.http.get('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/studentcourses');
    }

    myCourses(StudentID: any):Observable<any>{
      
      let params = new HttpParams();
      params = params.append("StudentID", StudentID);
      return this.http.get('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/mycourse',{params:params});
    }
    takeCourse(StudentID: any,CourseID: any):Observable<any>{
      
      let body={
        CourseID: CourseID,
        StudentID:StudentID
      }

      return this.http.post('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/studentcourses',body);
    }
    updateProgress(StudentID: any, CourseID:any){
      let body={
        CourseID: CourseID,
        StudentID:StudentID
      }
      return this.http.post('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/enrolledstudent',body);
    }

    getProgess(CourseID:any,StudentID:any):Observable<any>{
      let params = new HttpParams();
      params = params.append("CourseID",CourseID);
      params = params.append("StudentID", StudentID);
      console.log("studentID IN GET PROGRESS"+params.get('StudentID'));
      console.log("courseID IN GET PROGRESS"+params.get('CourseID'));
      return this.http.get('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/getstudentprogress',{params:params});
    }

    updateProgressvalue(CourseID:any,StudentID: any, Progress:number){
      let body={
        CourseID: CourseID,
        StudentID:StudentID,
        Progress:Progress
      }
      return this.http.post('https://anbhkc01l2.execute-api.ap-northeast-1.amazonaws.com/Dev1/mycourse',body);
    }
    
}