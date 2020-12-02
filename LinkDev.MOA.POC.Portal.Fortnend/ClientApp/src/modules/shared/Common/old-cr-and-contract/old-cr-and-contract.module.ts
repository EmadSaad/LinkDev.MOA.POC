import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OldCrAndContractComponent } from './old-cr-and-contract/old-cr-and-contract.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../../form-guide/multiselect/mutliselect.module';
import { InfoViewerModule } from '../../form-guide/info-viewer/info-viewer.module';
import { TextBoxModule } from '../../form-guide/text-box/modules/textbox.module';
import { GridModule } from '../../form-guide/grid/grid.module';
import { ValidationViewerModule } from '../validation-viewer/validation-viewer.module';


@NgModule({
  declarations: [OldCrAndContractComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MutliselectModule,
    InfoViewerModule,
    TextBoxModule,
    GridModule,
    ValidationViewerModule,

  ],
  exports:[OldCrAndContractComponent]
})
export class OldCrAndContractModule { }
