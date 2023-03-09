import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponent as Provider} from './provider/app.component';
import { SignUpComponent } from './provider/sign-up/sign-up.component';
import { SignInComponent } from './provider/sign-in/sign-in.component';
import { ProfileComponent } from './provider/profile/profile.component';
import { AppComponent as Student} from './student/app.component';
import { SignUpComponent as studSignUpComponent} from './student/sign-up/sign-up.component';
import { SignInComponent as studSignInComponent} from './student/sign-in/sign-in.component';
import { ProfileComponent as studProfileComponent} from './student/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCourseComponent } from './provider/create-course/create-course.component';
import { HttpClientModule } from '@angular/common/http';
import { ProviderDashbordComponent } from './provider/provider-dashbord/provider-dashbord.component';
import { UpdateCourseComponent } from './provider/update-course/update-course.component';
import { StudentDashbordComponent } from './student/student-dashbord/student-dashbord.component';
import { MyCoursesComponent } from './student/my-courses/my-courses.component';
import { ViewCourseComponent } from './student/view-course/view-course.component';
@NgModule({
  declarations: [
    AppComponent,
    Provider,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    Student,
    studProfileComponent,
    studSignInComponent,
    studSignUpComponent,
    DashboardComponent,
    CreateCourseComponent,
    ProviderDashbordComponent,
    UpdateCourseComponent,
    StudentDashbordComponent,
    MyCoursesComponent,
    ViewCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
