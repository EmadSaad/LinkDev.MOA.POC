import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScreenInvestmentLicenseComponent } from './Components/Screen-Investment-License.component';

const routes: Routes = [
  { path: '', component: ScreenInvestmentLicenseComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ScreenInvestmentLicenseRoutingModule { }
