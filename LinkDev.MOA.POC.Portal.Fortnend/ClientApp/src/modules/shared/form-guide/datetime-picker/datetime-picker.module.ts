// import { NgModule, Injectable } from '@angular/core';
// import { CommonModule, DatePipe } from '@angular/common';
// import { DatetimePickerComponent } from './datetime-picker.component';
// import { OwlDateTimeModule, OwlNativeDateTimeModule, OwlDateTimeIntl, OWL_DATE_TIME_LOCALE, OWL_DATE_TIME_FORMATS, DateTimeAdapter } from 'ng-pick-datetime';
// import { FormsModule } from '@angular/forms';
// import { NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// import { OwlMomentDateTimeModule, OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, MomentDateTimeAdapter } from 'ng-pick-datetime-moment';
// import { TranslateService } from '@ngx-translate/core';
// import { SharedModule } from '../../shared.module';
// import { DateFilterPipe } from '../pipes/date-filter.pipe';

// // @Injectable()
//  //export class CustomDateTimeAdapter extends DateTimeAdapter<T> {

//  //}
// export const MY_CUSTOM_FORMATS = {
//     fullPickerInput: 'DD-MM-YYYY    HH: mm',
//     parseInput: 'DD-MM-YYYY    HH: mm',
//     datePickerInput: 'DD-MM-YYYY',
//     timePickerInput: 'LT',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY'
// };
// @Injectable()
// export class DefaultIntl extends OwlDateTimeIntl {

//     constructor(private translateService: TranslateService) {
//         super();
//         this.translateService.get('DATE_PICKER.CANCEL_LABEL')
//             .subscribe(translationResult => {
//                 this.cancelBtnLabel = translationResult;
//             });
//         this.translateService.get('DATE_PICKER.SET_LABEL')
//             .subscribe(translationResult => {
//                 this.setBtnLabel = translationResult;
//             });
//         this.translateService.get('DATE_PICKER.PM_LABEL')
//             .subscribe(translationResult => {
//                 this.hour12PMLabel = translationResult;
//             });
//         this.translateService.get('DATE_PICKER.AM_LABEL')
//             .subscribe(translationResult => {
//                 this.hour12AMLabel = translationResult;
//             });
//     }
// };

// export class CustomDateAdapter {
//     fromModel(value: string): NgbDateStruct {
//         if (!value)
//             return null
//         let parts = value.split('-');
//         let days = parts[2].split('T');
//         return { year: +parts[0], month: +parts[1], day: +days[0] }
//     }

//     toModel(date: NgbDateStruct): string // from internal model -> your mode
//     {
//         return date ? date.year + "-" + ('0' + date.month).slice(-2)
//             + "-" + ('0' + date.day).slice(-2) : null
//     }
// }

// @NgModule({
//     declarations: [DatetimePickerComponent/*, DateFilterPipe*/],
//     imports: [
//         OwlDateTimeModule,
//         FormsModule,
//         OwlNativeDateTimeModule,
//         CommonModule,
//         SharedModule
//     ],
//     providers: [
//         { provide: OwlDateTimeIntl, useClass: DefaultIntl },
//         { provide: NgbDateAdapter, useClass: OwlDateTimeIntl },
//         { provide: OWL_MOMENT_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true } },
//         { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter },
//         //DatePipe,
//         { provide: OWL_DATE_TIME_FORMATS, useValue: MY_CUSTOM_FORMATS }
//         //     { provide: DateTimeAdapter, useClass: CustomDateTimeAdapter },
//     ],
//     exports: [
//         DatetimePickerComponent
//     ]
// })
// export class DatetimePickerModule { }
