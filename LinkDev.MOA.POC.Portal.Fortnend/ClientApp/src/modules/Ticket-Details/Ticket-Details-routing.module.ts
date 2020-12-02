import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketDetailsComponent } from './Components/TicketDetails/TicketDetails.component';


const routes: Routes = [
  { path: '', component: TicketDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketDetailsRoutingModule { }

