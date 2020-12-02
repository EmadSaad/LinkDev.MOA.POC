import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { AlertsModule } from '../shared/form-guide/alerts/modules/alerts.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { TicketDetailsRoutingModule } from './Ticket-Details-routing.module';
import { TicketDetailsComponent } from './Components/TicketDetails/TicketDetails.component';
import { TicketPopUpComponent } from './Components/TicketDetails/Ticket-Popup.component';


@NgModule({
  imports: [
    CommonModule,
    TicketDetailsRoutingModule,
    TranslateModule,
    FormsModule,
    MutliselectModule,
    InfoViewerModule,
    TextBoxModule,
		GridModule,
    FormHierarchyModule,
    TextAreaModule,
    ValidationViewerModule,
    FileUploadModule,
    AppHeaderModule,
    AlertsModule,
    BreadcrumbModule
  ],
  declarations: [TicketDetailsComponent,TicketPopUpComponent]
})
export class TicketManagementModule { }
