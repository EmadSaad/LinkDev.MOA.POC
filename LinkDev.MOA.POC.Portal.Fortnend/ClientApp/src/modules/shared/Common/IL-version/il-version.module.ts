import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IlVersionComponent } from './il-version/il-version.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MutliselectModule } from '../../form-guide/multiselect/mutliselect.module';
import { InfoViewerModule } from '../../form-guide/info-viewer/info-viewer.module';
import { TextBoxModule } from '../../form-guide/text-box/modules/textbox.module';
import { ValidationViewerModule } from '../validation-viewer/validation-viewer.module';

@NgModule({
  declarations: [IlVersionComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MutliselectModule,
    InfoViewerModule,
    TextBoxModule,
    ValidationViewerModule
  ],
  exports:[
    IlVersionComponent
  ]
})
export class IlVersionModule { }
