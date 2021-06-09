import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InfrastructurePermitComponent } from './Components/Infrastructure-Permit/Infrastructure-Permit.component';

const routes: Routes = [
  { path: '', component: InfrastructurePermitComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InfrastructurePermitRoutingModule { }
