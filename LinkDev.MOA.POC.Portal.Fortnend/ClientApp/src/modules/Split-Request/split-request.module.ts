import { CrVersionModule } from "./../shared/Common/CR-version/cr-version.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitRequestRoutingModule } from "./split-request-routing.module";
import { SplitRequestComponent } from "./components/split-request.component";
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { SumPipeModule } from '../shared/Common/sum-pipe/sum-pipe.module';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { OldCrAndContractModule } from '../shared/Common/old-cr-and-contract/old-cr-and-contract.module';
import { GridEmitterModule } from '../shared/form-guide/gridEmmitter/gridEmitter.module';
import { IlVersionModule } from "../shared/Common/IL-version/il-version.module";
import { RequestQuoteModule } from "../shared/Common/request-quote/request-quote.module";
import { RequestSubmissionInfoModule } from "../shared/Common/request-submission-info/request-submission-info.module";

@NgModule({
  declarations: [SplitRequestComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MutliselectModule,
    InfoViewerModule,
    TextBoxModule,
		GridModule,
    FormHierarchyModule,
    TextAreaModule,
    SumPipeModule,
    ValidationViewerModule,
    FileUploadModule,
    AppHeaderModule,
    RequestCommentsModule,
    BreadcrumbModule,
    SplitRequestRoutingModule,
    DatePickerGreModule,
    OldCrAndContractModule,
    GridEmitterModule,
    CrVersionModule,
    IlVersionModule,
    RequestQuoteModule,
    RequestSubmissionInfoModule,
    
  ]
})
export class SplitRequestModule { }
