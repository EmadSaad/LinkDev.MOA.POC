import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FactoryInsideFactoryComponent } from './Components/factory-inside-factory/factory-inside-factory.component';

const routes: Routes = [
  { path: '', component: FactoryInsideFactoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactoryInsideFactoryRoutingModule { }
