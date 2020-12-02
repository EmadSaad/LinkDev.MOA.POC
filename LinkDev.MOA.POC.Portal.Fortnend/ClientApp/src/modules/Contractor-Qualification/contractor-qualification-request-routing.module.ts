import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContractorQualificationRequestComponent } from './Components/contractor-qualification-request/contractor-qualification-request.component';

const routes: Routes = [
  {path: '',component: ContractorQualificationRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractorQualificationRequestRoutingModule { }

