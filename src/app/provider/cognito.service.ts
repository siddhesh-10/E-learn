// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CognitoService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Amplify,  Auth } from 'aws-amplify';

import { environment } from '../../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;
  public isAuthenticateduser: boolean = false;
  private isAuthenticatedSub: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor() {
    this.isAuthenticateduser=false;
    this.isAuthenticatedSub = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSub.asObservable();
    Amplify.configure({
      Auth: environment.cognito,
    });
console.log("amplify cognito config");
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
      attributes: {name:user.name}
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }
  public setAuthenticated(value: boolean): void {
    this.isAuthenticatedSub.next(value);
  }
  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then(() => {
      this.authenticationSubject.next(true);
      this.setAuthenticated(true);
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.isAuthenticateduser=false;
      this.authenticationSubject.next(false);
      this.setAuthenticated(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      this.isAuthenticatedSub.next(true);
      return Promise.resolve(true);
    } else {
      this.isAuthenticateduser=true;
      return this.getUser()
      .then((user: any) => {
        if (user) {
          this.isAuthenticatedSub.next(true);
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }
  public isAuthenticatedu(): Observable<boolean> {
    return new Observable((observer) => {
      if (this.authenticationSubject.value) {
            observer.next(true);
          observer.complete();
      } else {
        observer.next(false);
        observer.complete();
      }
    });
  }


  public getUser(): Promise<any> {
 return Auth.currentAuthenticatedUser().then((data) => {
      // console.log(JSON.stringify(data));
      // console.log("/;/")
      // console.log(JSON.stringify(Auth));
      return data;
    });
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}