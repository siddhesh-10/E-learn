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
import { CreateCourseComponent } from './provider/create-course/create-course.component';
import { ProviderDashbordComponent } from './provider/provider-dashbord/provider-dashbord.component';
import { UpdateCourseComponent } from './provider/update-course/update-course.component';
import { StudentDashbordComponent } from './student/student-dashbord/student-dashbord.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';
import { ViewCourseComponent } from './student/view-course/view-course.component';
import { MyChatBotComponent } from './my-chat-bot/my-chat-bot.component';
import { ConnectComponent } from './provider/connect/connect.component';
import { CcpComponent } from './provider/ccp/ccp.component';
const routes: Routes = [
  
  
  {path:'',component:DashboardComponent},
  {path:'provider', component:provider},
  {path:'provider/sign-in', component:SignInComponent},
  {path:'provider/sign-up',component:SignUpComponent},
  {path:'provider/profile',component:ProfileComponent},
  {path:'provider/create-course',component:CreateCourseComponent},
  {path:'provider/dashbord', component:ProviderDashbordComponent},
  {path:'provider/update-course', component:UpdateCourseComponent},
  {path:'provider/connect', component:ConnectComponent},
  {path:'ccpconnect', component:CcpComponent},
  {path:'student', component:Student},
  {path:'student/sign-in', component:studSignInComponent},
  {path:'student/sign-up',component:studSignUpComponent},
  {path:'student/profile',component:studProfileComponent},
  {path:'student/student-dashbord', component:StudentDashbordComponent},
  {path:'student/my-courses', component:MyCoursesComponent},
  {path:'student/view-course', component:ViewCourseComponent},
  {path:'help', component:MyChatBotComponent},
  {path:'**', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
