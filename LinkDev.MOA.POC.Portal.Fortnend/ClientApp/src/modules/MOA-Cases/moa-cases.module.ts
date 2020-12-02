import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoaCasesRoutingModule } from './MOA-Cases-routin-module';
import { MoaCasesComponent } from './Components/moa-cases/moa-cases.component';
import { BreadcrumbModule } from '../shared/breadcrumb/breadcrumb.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { AppHeaderModule } from '../shared/app-header/app-header.module';
import { OldCrAndContractModule } from '../shared/Common/old-cr-and-contract/old-cr-and-contract.module';
import { ValidationViewerModule } from '../shared/Common/validation-viewer/validation-viewer.module';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { CrVersionModule } from '../shared/Common/CR-version/cr-version.module';
import { IlVersionModule } from '../shared/Common/IL-version/il-version.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { GridEmitterModule } from '../shared/form-guide/gridEmmitter/gridEmitter.module';
import { FileUploadModule } from '../shared/form-guide/file-upload/modules/file-upload.module';
import { RequestQuoteModule } from '../shared/Common/request-quote/request-quote.module';
import { RequestCommentsModule } from '../shared/Common/request-comments/request-comments.module';
import { RequestSubmissionInfoModule } from '../shared/Common/request-submission-info/request-submission-info.module';
import { WorkspaceSidenavComponent } from '../workspace/components/shared/workspace-sidenav/workspace-sidenav.component';
import { MOASideNavComponent } from './Components/MOA-SideNav/MOA-SideNav.component';
import { DatePickerGreModule } from '../shared/form-guide/date-picker/modules/datepicker.module';
import { ListingGridComponent } from '../workspace/components/shared/listing-grid/listing-grid.component';
import { TableModule } from 'primeng/table';
import { FormGuideModule } from '../shared/form-guide/form-guide.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { RatingModule } from 'ngx-bootstrap';
import { WorkspaceSidenavModule } from '../workspace/components/shared/workspace-sidenav/workspace-sidenav.module';
import { ListingGridModule } from '../workspace/components/shared/listing-grid/listing-grid.module';

@NgModule({
  imports: [
    CommonModule,
    MoaCasesRoutingModule,
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
    RequestQuoteModule,
    RequestCommentsModule,
    RequestSubmissionInfoModule,
    DatePickerGreModule,
    TableModule,
    FormGuideModule,
    SwiperModule,
    RatingModule,
    WorkspaceSidenavModule,
    ListingGridModule
  ],
  declarations: [MoaCasesComponent,MOASideNavComponent]
})
export class MoaCasesModule { }
