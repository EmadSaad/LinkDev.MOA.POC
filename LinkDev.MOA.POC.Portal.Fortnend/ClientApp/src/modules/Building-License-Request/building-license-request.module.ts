import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { BuildingLicenseRequestComponent } from './Component/building-license-request/building-license-request.component';
import { BuildingLicenseRequestRoutingModule } from './building-license-request.routing.module';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { CurrencyInputModule } from '../shared/form-guide/currency-input/modules/currency-input.module';


@NgModule({
  imports: [
    CommonModule,
    BiddingModule,
    BuildingLicenseRequestRoutingModule,
    FormsModule,
    TextBoxModule,
    MutliselectModule,
    GridModule,
    TranslateModule,
    FileUploadModule,
    TextAreaModule,
    FormHierarchyModule,
    ValidationViewerModule,
    DatePickerGreModule,
    AppHeaderModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    InfoViewerModule,
    BreadcrumbModule,
    CurrencyInputModule
  ],
  declarations: [BuildingLicenseRequestComponent]
})
export class BuildingLicenseRequestModule { }
