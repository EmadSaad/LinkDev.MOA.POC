import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { LicenseDetailsComponent } from './components/license-details/license-details.component';
import { PermitDetailsComponent } from './components/Permit-details/Permit-details.components';
import { OperatingLicenseDetailsComponent } from './components/operating-license-details/operating-license-details/operating-license-details.component';
import { ConsultingOfficeCertificateDetailsComponent } from './components/Consulting-Office-Certificate-details/Consulting-Office-Certificate-details.component';
import { ContractorCertificateDetailsComponent } from './components/Contractor-Certificate-details/Contractor-Certificate-details.component';
import { LetterDetailsComponent } from './components/letter-details/letter-details.component';

const routes: Routes = [
  { path: 'contract-details', component: ContractDetailsComponent },
  { path: 'license-details', component: LicenseDetailsComponent },
  { path: 'permit-letter', component: PermitDetailsComponent },
  { path: 'operating-license-details', component: OperatingLicenseDetailsComponent },
  {path: 'Consulting-Office-Certificate-details', component:ConsultingOfficeCertificateDetailsComponent},
  {path: 'Contractor-Certificate-details', component:ContractorCertificateDetailsComponent},
  {path: 'letter-details', component:LetterDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutputsRoutingModule { }
