import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationViewerComponent } from './validation-viewer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [ValidationViewerComponent],
  exports: [ValidationViewerComponent]
})
export class ValidationViewerModule { }
