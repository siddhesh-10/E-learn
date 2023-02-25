import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './provider/sign-in/sign-in.component';
import { SignUpComponent } from './provider/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './provider/profile/profile.component';
import { AppComponent as provider } from './provider/app.component';
import { AppComponent as Student} from './student/app.component';
import { SignUpComponent as studSignUpComponent} from './student/sign-up/sign-up.component';
import { SignInComponent as studSignInComponent} from './student/sign-in/sign-in.component';
import { ProfileComponent as studProfileComponent} from './student/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  
  
  {path:'',component:DashboardComponent},
  {path:'provider', component:provider},
  {path:'provider/sign-in', component:SignInComponent},
  {path:'provider/sign-up',component:SignUpComponent},
  {path:'provider/profile',component:ProfileComponent},
  {path:'student', component:Student},
  {path:'student/sign-in', component:studSignInComponent},
  {path:'student/sign-up',component:studSignUpComponent},
  {path:'student/profile',component:studProfileComponent},
  {path:'**', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
