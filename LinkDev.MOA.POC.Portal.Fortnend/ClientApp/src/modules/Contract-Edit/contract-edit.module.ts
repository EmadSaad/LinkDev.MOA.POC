import { IlVersionModule } from './../shared/Common/IL-version/il-version.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractEditRoutingModule } from './contract-edit-routing.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { SumPipeModule } from '../shared/Common/sum-pipe/sum-pipe.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { CurrencyInputModule } from '../shared/form-guide/currency-input/modules/currency-input.module';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { ContractEditComponent } from './Components/contract-edit/contract-edit.component';
import { OldCrAndContractModule } from '../shared/Common/old-cr-and-contract/old-cr-and-contract.module';
import { CrVersionModule } from '../shared/Common/CR-version/cr-version.module';
import { RequestQuoteModule } from '../shared/Common/request-quote/request-quote.module';

@NgModule({
  imports: [
    CommonModule,
    ContractEditRoutingModule,
    FormsModule,
    MutliselectModule,
    TranslateModule,
    BreadcrumbModule,
    ValidationViewerModule,
    InfoViewerModule,
    TextBoxModule,
    IslamicDatePickerModule,
		GridModule,
    FormHierarchyModule,
    TextAreaModule,
    SumPipeModule,
    FileUploadModule,
    DatePickerGreModule,
    AppHeaderModule,
    AlertsModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    CurrencyInputModule,
    ContractEditRoutingModule,
    OldCrAndContractModule,
    CrVersionModule,
    IlVersionModule,
    RequestQuoteModule

  ],
  declarations: [ContractEditComponent]
})
export class ContractEditModule { }
