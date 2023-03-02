import { Injectable } from '@angular/core';
///
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
///
@Injectable({
  providedIn: 'root'
})
export class LearningDataService {

  constructor(private http:HttpClient) { }
  gettokens(code1:any):Observable<any>
  {
    const url = "https://mahabooking.auth.ap-northeast-1.amazoncognito.com/oauth2/token";
   const body = new URLSearchParams();
   body.set("grant_type","authorization_code");
   body.set( "client_id","6fur5nq1a2hpg2cnjn7416dnpo");
   body.set( "redirect_uri","http://localhost:4200/home");
   body.set(  "code",code1);
   const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  return this.http.post(url, body.toString(), { headers:headers})
  
    
  }
}
