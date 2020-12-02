import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Modules
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { NgbdDatepickerPopup } from '../components/date-picker.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NgbdDatepickerPopup
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule,
    TranslateModule
  ],
  exports: [
    NgbdDatepickerPopup
  ]
})
export class DatePickerGreModule { }
