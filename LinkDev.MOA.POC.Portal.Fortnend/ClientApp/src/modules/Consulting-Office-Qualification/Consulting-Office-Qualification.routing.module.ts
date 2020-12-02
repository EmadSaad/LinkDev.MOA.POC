import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ConsultingOfficeQualificationComponent } from "./Component/Consulting-Office-Qualification/Consulting-Office-Qualification.component";
import { AuthGuardService } from "../Guards/AuthGuard.guard ";

const routes: Routes = [
  {path: '',component: ConsultingOfficeQualificationComponent,
  canActivate:[AuthGuardService]
  // canActivate:[AuthGuardService],
  // canActivateChild:[AuthGuardService]
},
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultingOfficeQualificationRoutingModule  {}
