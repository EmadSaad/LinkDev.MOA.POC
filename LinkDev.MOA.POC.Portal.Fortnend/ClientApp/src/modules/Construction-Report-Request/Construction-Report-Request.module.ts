import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstructionReportRequestRoutingModule } from './Construction-Report-Request.routing.module';
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
import { ConstructionReportRequestComponent } from './Construction-Report-Request/Construction-Report-Request.component';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';

@NgModule({
  imports: [
    CommonModule,
    ConstructionReportRequestRoutingModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    GridModule,
    TranslateModule,
    TextAreaModule,
    FormHierarchyModule,
    SelectDropDownModule,
    InfoViewerModule,
    AppHeaderModule,
    AlertsModule,
    RequestSubmissionInfoModule
  ],
  declarations: [ConstructionReportRequestComponent]
})
export class ConstructionReportRequestModule { }
