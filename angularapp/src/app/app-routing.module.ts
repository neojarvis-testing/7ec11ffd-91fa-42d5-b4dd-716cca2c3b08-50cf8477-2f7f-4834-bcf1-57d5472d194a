import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [


  {path:"home",component:HomeComponent},
  {path:"adminaddservice",component:AdminaddserviceComponent},
  {path:"adminnavbar",component:AdminnavbarComponent},
  {path:"adminviewappointment",component:AdminviewappointmentComponent},
  {path:"adminviewfeedback",component:AdminviewfeedbackComponent},
  {path:"adminviewservice",component:AdminviewserviceComponent},
  {path:"adminviewuserdetails",component:AdminviewuserdetailsComponent},
  {path:"login",component:LoginComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"profile",component:ProfileComponent},
  {path:"registration",component:RegistrationComponent},
  {path:"useraddappointment",component:UseraddappointmentComponent},
  {path:"useraddfeedback",component:UseraddfeedbackComponent},
  {path:"usernavbar",component:UsernavbarComponent},
  {path:"userviewappointment",component:UserviewappointmentComponent},
  {path:"userviewfeedback",component:UserviewfeedbackComponent},
  {path:"adminaddservice/:id",component:AdminaddserviceComponent},
  {path:"**",component:ErrorComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
