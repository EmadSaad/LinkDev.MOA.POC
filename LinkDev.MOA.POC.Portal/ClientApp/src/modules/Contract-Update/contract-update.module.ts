import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractUpdateRoutingModule } from './contract-update-routing.module';
import { ContractUpdateComponent } from './components/contract-update/contract-update.component';
import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { TranslateModule } from '@ngx-translate/core';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { OldCrAndContractModule } from '../shared/Common/old-cr-and-contract/old-cr-and-contract.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { CrVersionModule } from '../shared/Common/CR-version/cr-version.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { IlVersionModule } from '../shared/Common/IL-version/il-version.module';


@NgModule({
  declarations: [ContractUpdateComponent],
  imports: [
    CommonModule,
    ContractUpdateRoutingModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    TranslateModule,
    IslamicDatePickerModule,
    AppHeaderModule,
    AlertsModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    BreadcrumbModule,
    OldCrAndContractModule,
    FormHierarchyModule,
    TextAreaModule,
    InfoViewerModule,
    ValidationViewerModule,
    FileUploadModule,
    CrVersionModule,
    GridModule,
    IlVersionModule
  ]
})
export class ContractUpdateModule { }
