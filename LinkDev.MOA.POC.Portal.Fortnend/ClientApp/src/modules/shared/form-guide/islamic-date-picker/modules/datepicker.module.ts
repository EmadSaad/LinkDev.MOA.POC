import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// Modules
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
// Components
import { NgbdDatepickerIslamiccivil } from '../components/date-picker.component';

@NgModule({
  declarations: [
    NgbdDatepickerIslamiccivil
  ],
  imports: [
    FormsModule,
    CommonModule,
    TranslateModule,
    NgbDatepickerModule
  ],
  exports: [
    NgbdDatepickerIslamiccivil
  ]
})
export class IslamicDatePickerModule { }