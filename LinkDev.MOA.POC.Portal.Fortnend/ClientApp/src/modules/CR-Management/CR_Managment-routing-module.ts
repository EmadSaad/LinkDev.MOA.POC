import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CrDetailsComponent } from "./Components/CrDetails/CrDetails.component";
import { CRindustrialLicensesComponent } from "./Components/CRIndustrialLicenses/CRindustrialLicenses.component";
import { CRManagementComponent } from "./CR-Management.component";
import { MyCRsComponent } from "./Components/MyCRs/MyCRs.component";
import { AuthGuardService } from "../Guards/AuthGuard.guard ";
import { CRContractsComponent } from "./Components/crcontracts/crcontracts.component";
import { CRContactDetailsAndRepresentativesComponent } from "./Components/crcontact-details-and-representatives/crcontact-details-and-representatives.component";
import { CRInfoComponent } from "./Components/crinfo/crinfo.component";


const routes: Routes = [
  {
    path: '', component: CRManagementComponent,
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService],
    children: [
      
      { path: 'CrDetails', component: CrDetailsComponent },
      { path: 'CrInfo', component: CRInfoComponent },
      { path: 'industrialLicenses', component: CRindustrialLicensesComponent },
      { path: 'CR-ContactsandRepresentatives', component: CRContactDetailsAndRepresentativesComponent },
      { path: 'CR-Contract', component: CRContractsComponent },
      { path: 'CR_Manaement', component: CRManagementComponent },
    ]
  },
  { path: 'MyCRs', component: MyCRsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class CRManagmentRoutingModule {

}
