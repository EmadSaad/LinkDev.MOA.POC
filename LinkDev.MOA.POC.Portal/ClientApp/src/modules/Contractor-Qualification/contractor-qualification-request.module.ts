import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorQualificationRequestComponent } from './Components/contractor-qualification-request/contractor-qualification-request.component';
import { ContractorQualificationRequestRoutingModule } from './contractor-qualification-request-routing.module';
import { FormsModule } from '@angular/forms';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { TranslateModule } from '@ngx-translate/core';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { CurrencyInputModule } from '../shared/form-guide/currency-input/modules/currency-input.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { RequestQuoteModule } from '../shared/Common/request-quote/request-quote.module';

@NgModule({
  imports: [
    CommonModule,
    ContractorQualificationRequestRoutingModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    ValidationViewerModule,
    GridModule,
    FileUploadModule,
    TranslateModule,
    TextAreaModule,
    FormHierarchyModule,
    SelectDropDownModule,
    InfoViewerModule,
    AppHeaderModule,
    AlertsModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    CurrencyInputModule,
    BreadcrumbModule,
    RequestQuoteModule,
    DatePickerGreModule
  ],
  declarations: [ContractorQualificationRequestComponent]
})
export class ContractorQualificationRequestModule { }
