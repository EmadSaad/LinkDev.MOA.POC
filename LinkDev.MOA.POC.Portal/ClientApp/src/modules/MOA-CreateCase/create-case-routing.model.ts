import { Routes, RouterModule } from '@angular/router';
import { CreateCaseComponent } from './Components/Create-Case/Create-Case.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: CreateCaseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreateCaseRoutingModule { }
