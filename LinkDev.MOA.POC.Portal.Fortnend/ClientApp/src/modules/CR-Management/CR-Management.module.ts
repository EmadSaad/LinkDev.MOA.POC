import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRManagementComponent } from './CR-Management.component';
import { MyCRsComponent } from './Components/MyCRs/MyCRs.component';
import { CRindustrialLicensesComponent } from './Components/CRIndustrialLicenses/CRindustrialLicenses.component';
import { CrDetailsComponent } from './Components/CrDetails/CrDetails.component';

import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { CRManagmentRoutingModule } from './CR_Managment-routing-module';
import { GridModule } from '../shared/form-guide/grid/grid.module'
import { TranslateModule } from '@ngx-translate/core';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { GridEmitterModule } from '../shared/form-guide/gridEmmitter/gridEmitter.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { CRContractsComponent } from './Components/crcontracts/crcontracts.component';
import { CRContactDetailsAndRepresentativesComponent } from './Components/crcontact-details-and-representatives/crcontact-details-and-representatives.component';
import { CRInfoComponent } from './Components/crinfo/crinfo.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    CRManagmentRoutingModule,
    GridModule,
    GridEmitterModule,
    TranslateModule,
    FormHierarchyModule,
    ValidationViewerModule,
    SelectDropDownModule,
    AlertsModule
  ],
  declarations: [CRManagementComponent, MyCRsComponent, CRindustrialLicensesComponent, CrDetailsComponent
    , CRContractsComponent, CRContactDetailsAndRepresentativesComponent, CRInfoComponent]
})
export class CRManagementModule { } 
