import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractUpdateComponent } from './components/contract-update/contract-update.component';

const routes: Routes = [
  { path: '', component: ContractUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractUpdateRoutingModule { }
