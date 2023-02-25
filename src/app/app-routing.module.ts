import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { SignInComponent } from './provider/sign-in/sign-in.component';
import { SignUpComponent } from './provider/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './provider/profile/profile.component';

const routes: Routes = [
  //{path:'', component:SigninComponent},
  //{path:'signin',component:SigninComponent},
  {path:'',component:AppComponent},
  {path:'home' , component:HomeComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'provider-dashboard', component:ProviderDashboardComponent},
  {path:'provider/sign-in', component:SignInComponent},
  {path:'provider/sign-up',component:SignUpComponent},
  {path:'provider/profile',component:ProfileComponent},
  {path:'**', component:SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
