import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MOAPaymentRoutingModule } from './moa-payment-routing.module';
import { MoaPaymentComponent } from './Components/moa-payment/moa-payment.component';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';

@NgModule({
  declarations: [MoaPaymentComponent],
  imports: [
    CommonModule,
    MOAPaymentRoutingModule,
    BreadcrumbModule,
    FormHierarchyModule,
    TranslateModule,
    FormsModule,
    AppHeaderModule,
    ValidationViewerModule,
    MutliselectModule,
    TextBoxModule,
    InfoViewerModule,
    FileUploadModule,
    RequestSubmissionInfoModule
  ]
})
export class MOAPaymentModule { }
