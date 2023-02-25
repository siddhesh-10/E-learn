import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppComponent as Provider} from './provider/app.component';
import { SignUpComponent } from './provider/sign-up/sign-up.component';
import { SignInComponent } from './provider/sign-in/sign-in.component';
import { ProfileComponent } from './provider/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    Provider,
    SignUpComponent,
    SignInComponent,
    ProfileComponent
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
