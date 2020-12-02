import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';
import { OperatingLicenseRequestComponent } from './Component/operating-license-request/operating-license-request.component';



const routes: Routes = [
  {path: '',component: OperatingLicenseRequestComponent,canActivate:[AuthGuardService],canActivateChild:[AuthGuardService]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OperatingLicenseRequestRoutingModule { }
