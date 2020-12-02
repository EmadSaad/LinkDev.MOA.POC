import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractSubmissionRoutingModule } from './contract-submission-routing.module';
import { ContractSubmissionComponent } from './components/contract-submission/contract-submission.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../shared/form-guide/multiselect/mutliselect.module';
import { InfoViewerModule } from '../shared/form-guide/info-viewer/info-viewer.module';
import { TextBoxModule } from '../shared/form-guide/text-box/modules/textbox.module';
import { IslamicDatePickerModule } from '../shared/form-guide/islamic-date-picker/modules/datepicker.module';
import { GridModule } from '../shared/form-guide/grid/grid.module';
import { FormHierarchyModule } from '../shared/form-guide/form-hierarchy/form-hierarchy.module';
import { TextAreaModule } from '../shared/form-guide/textarea/modules/textarea.module';
import { SumPipeModule } from '../shared/Common/sum-pipe/sum-pipe.module';

import { SharedModule } from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    ContractSubmissionRoutingModule,
    TranslateModule,
    FormsModule,
    MutliselectModule,
    InfoViewerModule,
    TextBoxModule,
    IslamicDatePickerModule,
    GridModule,
    FormHierarchyModule,
    TextAreaModule,
    SumPipeModule
  ],
  declarations: [ContractSubmissionComponent]
})
export class ContractSubmissionModuleBackup { }
