import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TimePickerComponent } from '../components/time-picker.component';

@NgModule({
    declarations: [
        TimePickerComponent,

    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbTimepickerModule

    ],
    exports: [
        TimePickerComponent,
    ]
})
export class TimePickerModule { }
