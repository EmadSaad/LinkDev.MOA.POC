import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { DrillingPermitComponent } from '../Drilling-Permit/Drilling-Permit/Drilling-Permit.Component';

const routes: Routes = [
  {path: '',component:DrillingPermitComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DrillingPermitroutingmodule { }



