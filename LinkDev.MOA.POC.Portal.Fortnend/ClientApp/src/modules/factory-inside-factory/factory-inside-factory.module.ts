import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactoryInsideFactoryRoutingModule } from './factory-inside-factory-routing.module';
import { FactoryInsideFactoryComponent } from './Components/factory-inside-factory/factory-inside-factory.component';
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

@NgModule({
  declarations: [FactoryInsideFactoryComponent],
  imports: [
    CommonModule,
    FactoryInsideFactoryRoutingModule,
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
  ]
})
export class FactoryInsideFactoryModule { }
