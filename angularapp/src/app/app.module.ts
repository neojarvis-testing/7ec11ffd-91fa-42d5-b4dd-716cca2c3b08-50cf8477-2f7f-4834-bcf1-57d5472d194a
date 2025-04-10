import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminaddserviceComponent } from './adminaddservice/adminaddservice.component';
import { AdminnavbarComponent } from './adminnavbar/adminnavbar.component';
import { AdminviewappointmentComponent } from './adminviewappointment/adminviewappointment.component';
import { AdminviewfeedbackComponent } from './adminviewfeedback/adminviewfeedback.component';
import { AdminviewserviceComponent } from './adminviewservice/adminviewservice.component';
import { AdminviewuserdetailsComponent } from './adminviewuserdetails/adminviewuserdetails.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UseraddappointmentComponent } from './useraddappointment/useraddappointment.component';
import { UseraddfeedbackComponent } from './useraddfeedback/useraddfeedback.component';
import { UsernavbarComponent } from './usernavbar/usernavbar.component';
import { UserviewappointmentComponent } from './userviewappointment/userviewappointment.component';
import { UserviewfeedbackComponent } from './userviewfeedback/userviewfeedback.component';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [
    AppComponent,
    AdminaddserviceComponent,
    AdminnavbarComponent,
    AdminviewappointmentComponent,
    AdminviewfeedbackComponent,
    AdminviewserviceComponent,
    AdminviewuserdetailsComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegistrationComponent,
    UseraddappointmentComponent,
    UseraddfeedbackComponent,
    UsernavbarComponent,
    UserviewappointmentComponent,
    UserviewfeedbackComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }