import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { BuildingLicenseRequestComponent } from './Component/building-license-request/building-license-request.component';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';



const routes: Routes = [
  {path: '',component: BuildingLicenseRequestComponent,canActivate:[AuthGuardService],canActivateChild:[AuthGuardService]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BuildingLicenseRequestRoutingModule { }
