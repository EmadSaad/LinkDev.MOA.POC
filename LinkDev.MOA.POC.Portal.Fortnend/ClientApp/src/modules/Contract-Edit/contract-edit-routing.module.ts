import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContractEditComponent } from './Components/contract-edit/contract-edit.component';


const routes: Routes = [
 { path: '', component: ContractEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractEditRoutingModule { }
