import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
