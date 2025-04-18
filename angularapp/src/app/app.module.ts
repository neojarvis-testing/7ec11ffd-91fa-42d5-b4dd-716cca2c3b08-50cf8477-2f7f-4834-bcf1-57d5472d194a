import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth.interceptor';
import { RouterModule } from '@angular/router';
import { AdminviewdescriptionComponent } from './adminviewdescription/adminviewdescription.component';
import { UserNotificationComponent } from './usernotification/usernotification.component';
import { AdminNotificationComponent } from './adminnotification/adminnotification.component';
import { AdminviewreportsComponent } from './adminviewreports/adminviewreports.component';
import { ChartsModule } from 'ng2-charts';
import { MapComponent } from './map/map.component';
import { FooterComponent } from './footer/footer.component';

 
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
    UserviewfeedbackComponent,
    AdminviewdescriptionComponent,
    UserNotificationComponent,
    AdminNotificationComponent,
    AdminviewreportsComponent,
    MapComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ChartsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }