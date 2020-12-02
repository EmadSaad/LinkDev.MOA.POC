import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoaPaymentComponent } from './Components/moa-payment/moa-payment.component';

const routes: Routes = [
  { path: '', component: MoaPaymentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MOAPaymentRoutingModule { }
