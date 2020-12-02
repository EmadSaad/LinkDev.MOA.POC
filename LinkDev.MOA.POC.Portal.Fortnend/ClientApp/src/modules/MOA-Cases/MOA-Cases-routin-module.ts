import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MoaCasesComponent } from './Components/moa-cases/moa-cases.component';


const routes: Routes = [
  { path: '', component: MoaCasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoaCasesRoutingModule { }

