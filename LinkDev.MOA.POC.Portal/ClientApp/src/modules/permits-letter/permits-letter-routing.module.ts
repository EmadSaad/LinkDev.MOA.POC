import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { PermitsLetterComponent } from './permits-letter/permits-letter.component';

const routes: Routes = [
  {path: '',component:PermitsLetterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermitsLetterRoutingModule { }
