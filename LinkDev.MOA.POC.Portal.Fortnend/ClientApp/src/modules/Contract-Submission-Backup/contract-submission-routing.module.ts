import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContractSubmissionComponent } from './components/contract-submission/contract-submission.component';

const routes: Routes = [
  {path: '',component: ContractSubmissionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractSubmissionRoutingModule { }
