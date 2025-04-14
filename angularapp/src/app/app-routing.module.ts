import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminaddserviceComponent } from './adminaddservice/adminaddservice.component';
import { AdminnavbarComponent } from './adminnavbar/adminnavbar.component';
import { AdminviewappointmentComponent } from './adminviewappointment/adminviewappointment.component';
import { AdminviewfeedbackComponent } from './adminviewfeedback/adminviewfeedback.component';
import { AdminviewserviceComponent } from './adminviewservice/adminviewservice.component';
import { AdminviewuserdetailsComponent } from './adminviewuserdetails/adminviewuserdetails.component';

import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UseraddappointmentComponent } from './useraddappointment/useraddappointment.component';
import { UseraddfeedbackComponent } from './useraddfeedback/useraddfeedback.component';
import { UsernavbarComponent } from './usernavbar/usernavbar.component';
import { UserviewappointmentComponent } from './userviewappointment/userviewappointment.component';
import { UserviewfeedbackComponent } from './userviewfeedback/userviewfeedback.component';

import { AdminNotificationComponent } from './adminnotification/adminnotification.component';
import { UserNotificationComponent } from './usernotification/usernotification.component';

import { AdminviewdescriptionComponent } from './adminviewdescription/adminviewdescription.component';



const routes: Routes = [
  {path:"home",component:HomeComponent},
  {path:"adminaddservice",component:AdminaddserviceComponent},
  {path:"adminnavbar",component:AdminnavbarComponent},
  {path:"adminviewappointment",component:AdminviewappointmentComponent},
  {path:"adminviewfeedback",component:AdminviewfeedbackComponent},
  {path:"adminviewservice",component:AdminviewserviceComponent},
  {path:"adminviewuserdetails",component:AdminviewuserdetailsComponent},
  {path:"login",component:LoginComponent},
  
  {path:"profile/:feedbackId",component:ProfileComponent},
  { path: 'adminnotification', component: AdminNotificationComponent },
  { path: 'usernotification', component: UserNotificationComponent },
  {path:"registration",component:RegistrationComponent},
  {path:"useraddappointment",component:UseraddappointmentComponent},
  {path:"useraddfeedback",component:UseraddfeedbackComponent},
  {path:"usernavbar",component:UsernavbarComponent},
  {path:"userviewappointment",component:UserviewappointmentComponent},
  {path:"userviewfeedback",component:UserviewfeedbackComponent},
  {path:"adminaddservice/:serviceId",component:AdminaddserviceComponent},
  {path:"error",component:ErrorComponent},
  { path: 'adminviewdescription/:serviceId', component: AdminviewdescriptionComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
