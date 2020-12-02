import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';
import { PartialBuildingRequestComponent } from './Component/partial-building-request/partial-building-request.component';



const routes: Routes = [
  {path: '',component: PartialBuildingRequestComponent,canActivate:[AuthGuardService],canActivateChild:[AuthGuardService]},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PartialBuildingRequestRoutingModule { }
