import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoordinationLetterComponent } from './coordination-letter/coordination-letter.component';
import { AuthGuardService } from '../Guards/AuthGuard.guard ';


const routes: Routes = [
  {path: '',component:CoordinationLetterComponent , canActivate: [AuthGuardService] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinationLetterRoutingModule { }