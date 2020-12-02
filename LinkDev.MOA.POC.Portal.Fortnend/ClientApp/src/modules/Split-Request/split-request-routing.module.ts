import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitRequestComponent } from "./components/split-request.component";

const routes: Routes = [
  {path: '',component: SplitRequestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplitRequestRoutingModule { }
