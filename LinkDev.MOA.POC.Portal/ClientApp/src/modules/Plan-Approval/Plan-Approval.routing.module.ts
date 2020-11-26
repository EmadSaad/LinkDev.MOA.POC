import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { PlanApprovalComponent } from './Plan-Approval/Plan-Approval.component';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';



const routes: Routes = [
  {path: '',component: PlanApprovalComponent, canActivate: [AuthGuardService]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PlanApprovalRoutingModule { }
