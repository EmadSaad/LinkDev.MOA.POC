import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractMergeComponent } from './Components/contract-merge/contract-merge.component';

const routes: Routes = [
  { path: '', component: ContractMergeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractMergeRoutingModule { }
