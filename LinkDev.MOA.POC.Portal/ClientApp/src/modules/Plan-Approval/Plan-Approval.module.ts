import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanApprovalComponent } from './Plan-Approval/Plan-Approval.component';
import { PlanApprovalRoutingModule } from './Plan-Approval.routing.module';
import { BiddingModule } from '../shared/Common/Bidding/Bidding.module';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';
import { SharedHelper } from '../shared/services/shared-helper';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { RequestQuoteModule } from '../shared/Common/request-quote/request-quote.module';


@NgModule({
  imports: [
    CommonModule,
    BiddingModule,
    PlanApprovalRoutingModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    GridModule,
    TranslateModule,
    FileUploadModule,
    TextAreaModule,
    FormHierarchyModule,
    ValidationViewerModule,
    SelectDropDownModule,
    InfoViewerModule,
    DatePickerGreModule,
    AppHeaderModule,
    AlertsModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    RequestQuoteModule,
    
    //IslamicDatePickerModule
    
  ],
  declarations: [PlanApprovalComponent]
})
export class PlanApprovalModule { }
