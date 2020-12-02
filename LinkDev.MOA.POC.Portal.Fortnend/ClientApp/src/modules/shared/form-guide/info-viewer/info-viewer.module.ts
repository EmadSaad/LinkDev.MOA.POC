import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoViewerComponent } from './info-viewer.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule
  ],
  declarations: [InfoViewerComponent],
  exports:[InfoViewerComponent]
})
export class InfoViewerModule { }
