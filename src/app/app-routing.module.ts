import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './provider/sign-in/sign-in.component';
import { SignUpComponent } from './provider/sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './provider/profile/profile.component';
import { AppComponent as provider } from './provider/app.component';
const routes: Routes = [
  
  
  {path:'',component:AppComponent},
  {path:'provider', component:provider},
  {path:'provider/sign-in', component:SignInComponent},
  {path:'provider/sign-up',component:SignUpComponent},
  {path:'provider/profile',component:ProfileComponent},
  {path:'**', component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
