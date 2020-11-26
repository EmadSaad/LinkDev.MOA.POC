import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { MutliselectComponent } from './mutliselect.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectDropDownModule,
    TranslateModule
  ],
  exports: [
    MutliselectComponent
  ],
  declarations: [MutliselectComponent]
})
export class MutliselectModule { }
