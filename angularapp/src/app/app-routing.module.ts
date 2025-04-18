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
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { UseraddappointmentComponent } from './useraddappointment/useraddappointment.component';
import { UseraddfeedbackComponent } from './useraddfeedback/useraddfeedback.component';
import { UsernavbarComponent } from './usernavbar/usernavbar.component';
import { UserviewappointmentComponent } from './userviewappointment/userviewappointment.component';
import { UserviewfeedbackComponent } from './userviewfeedback/userviewfeedback.component';
import { AdminviewdescriptionComponent } from './adminviewdescription/adminviewdescription.component';
import { AdminviewreportsComponent } from './adminviewreports/adminviewreports.component';
import { AdminNotificationComponent } from './adminnotification/adminnotification.component';
import { UserNotificationComponent } from './usernotification/usernotification.component';
import { MapComponent } from './map/map.component';
import { AdminAuthGuard } from './adminauthguard.guard';
import { UserAuthGuard } from './userauthguard.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';



const routes: Routes = [


  {path:"home",component:HomeComponent},
  {path:"adminaddservice",component:AdminaddserviceComponent, canActivate: [AdminAuthGuard]},
  {path:"adminnavbar",component:AdminnavbarComponent, canActivate: [AdminAuthGuard]},
  {path:"adminviewappointment",component:AdminviewappointmentComponent, canActivate: [AdminAuthGuard]},
  {path:"adminviewfeedback",component:AdminviewfeedbackComponent, canActivate: [AdminAuthGuard]},
  {path:"adminviewservice",component:AdminviewserviceComponent, canActivate: [AdminAuthGuard]},
  {path:"adminviewuserdetails",component:AdminviewuserdetailsComponent, canActivate: [AdminAuthGuard]},
  {path:"login",component:LoginComponent},
  {path:"adminnotification",component:AdminNotificationComponent, canActivate: [AdminAuthGuard]},
  
  {path:"profile",component:ProfileComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"useraddappointment",component:UseraddappointmentComponent, canActivate: [UserAuthGuard]},
  {path:"useraddfeedback/:id",component:UseraddfeedbackComponent, canActivate: [UserAuthGuard]},
  {path:"usernavbar",component:UsernavbarComponent, canActivate: [UserAuthGuard]},
  {path:"userviewappointment",component:UserviewappointmentComponent, canActivate: [UserAuthGuard]},
  {path:"userviewfeedback",component:UserviewfeedbackComponent, canActivate: [UserAuthGuard]},
  {path:"adminaddservice/:serviceId",component:AdminaddserviceComponent, canActivate: [AdminAuthGuard]},
  {path:"error",component:ErrorComponent},
  {path: 'adminviewdescription/:serviceId', component: AdminviewdescriptionComponent, canActivate: [AdminAuthGuard]},
  {path:"adminviewreports",component:AdminviewreportsComponent, canActivate: [AdminAuthGuard]},
  {path:"usernotification",component:UserNotificationComponent, canActivate: [UserAuthGuard]},
  {path:"map",component:MapComponent, canActivate: [UserAuthGuard]},
  {path:"unauthorized",component:UnauthorizedComponent},
  {path:"**",component:HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
