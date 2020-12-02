import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { TicketManagementRoutingModule } from './Ticket_Management-routing.module';
import { TicketManagementComponent } from './Components/TicketManagement/TicketManagement.component';
import { TicketPopUpComponent } from './Components/TicketManagement/Ticket-Popup.component';


@NgModule({
  imports: [
    CommonModule,
    TicketManagementRoutingModule,
    TranslateModule,
    FormsModule,
    MutliselectModule,
    InfoViewerModule,
    TextBoxModule,
    IslamicDatePickerModule,
		GridModule,
    FormHierarchyModule,
    TextAreaModule,
    ValidationViewerModule,
    FileUploadModule,
    DatePickerGreModule,
    AppHeaderModule,
    AlertsModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    BreadcrumbModule
  ],
  declarations: [TicketManagementComponent,TicketPopUpComponent]
})
export class TicketManagementModule { }
