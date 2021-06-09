// Modules
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { TranslateModule } from '@ngx-translate/core';


// Components

import { TruncateTextPipe } from '../shared/pipes/truncate-text.pipe';
import { ServiceCategoriesComponent } from '../Portal-Services/components/service-categories/service-categories.component';
import { ServicesByCategoryComponent } from '../Portal-Services/components/services-by-category/services-by-category.component';
import { ServiceDetailsComponent } from '../Portal-Services/components/service-details/service-details.component';
import { PortalServicesComponent } from '../Portal-Services/portal-services.component';
import { ServiceCardComponent } from '../Portal-Services/components/service-card/service-card.component';
import { PortalServicesRoutingModule } from '../Portal-Services/portal-services-routing.module';
import { ScreenInvestmentLicenseComponent } from './Components/Screen-Investment-License.component';
import { ScreenInvestmentLicenseRoutingModule } from './Screen-Investment-License-routing.model';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { FormsModule } from '@angular/forms';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { CommonModule } from '@angular/common';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';

@NgModule({
    imports: [
        CommonModule,
        ScreenInvestmentLicenseRoutingModule,
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
        RequestSubmissionInfoModule,
        DatePickerGreModule,
        IslamicDatePickerModule,
      ],
      declarations: [ScreenInvestmentLicenseComponent]
    })

export class ScreenInvestmentLicenseModule { }
