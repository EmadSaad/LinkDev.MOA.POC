import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputsRoutingModule } from './outputs-routing.module';
import { ContractDetailsComponent } from './components/contract-details/contract-details.component';
import { LicenseDetailsComponent } from './components/license-details/license-details.component';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { GridEmitterModule } from '../shared/form-guide/gridEmmitter/gridEmitter.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { PermitDetailsComponent } from './components/Permit-details/Permit-details.components';
import { PermitRequestComponent } from '../workspace/components/PermitRequest/PermitRequest.component';
import { LetterDetailsComponent } from './components/letter-details/letter-details.component';
import { ConsultingOfficeCertificateDetailsComponent } from './components/Consulting-Office-Certificate-details/Consulting-Office-Certificate-details.component';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { ContractorCertificateDetailsComponent } from './components/Contractor-Certificate-details/Contractor-Certificate-details.component';
import { OperatingLicenseDetailsComponent } from './components/operating-license-details/operating-license-details/operating-license-details.component';




@NgModule({
  imports: [
    CommonModule,
    OutputsRoutingModule,
    FormHierarchyModule,
    BreadcrumbModule,
    GridEmitterModule,
    GridModule,
    FileUploadModule,
    TextBoxModule,
    FormsModule,
    TranslateModule,
    MutliselectModule,
    RequestSubmissionInfoModule,
    DatePickerGreModule,
    InfoViewerModule,
   

  ],
  declarations: [
    ContractDetailsComponent,
    LicenseDetailsComponent,
    PermitDetailsComponent,
    LetterDetailsComponent,
    ConsultingOfficeCertificateDetailsComponent,
      ContractorCertificateDetailsComponent,
      OperatingLicenseDetailsComponent ,
      LetterDetailsComponent
    ]
})
export class OutputsModule { }
