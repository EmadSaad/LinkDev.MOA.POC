import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { ConstructionReportRequestComponent } from './Construction-Report-Request/Construction-Report-Request.component';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';

const routes: Routes = [
  {path: '',component:ConstructionReportRequestComponent ,
    canActivate:[AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ConstructionReportRequestRoutingModule {}
