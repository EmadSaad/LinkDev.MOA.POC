import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestServiceComponent } from './test-service.component';
import { Routes, RouterModule } from '@angular/router';
import { ContractSubmissionSimulationComponent } from '../contract-submission-simulation/contract-submission-simulation.component';

const routes: Routes = [
  {path: '',component: TestServiceComponent},
  {path: 'contract-submission-simulation',component: ContractSubmissionSimulationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TestServiceRoutingModule { }
