// import { Component, OnInit, forwardRef, Input, EventEmitter, Output } from '@angular/core';
// import { NgbDateStruct, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { DateTimeAdapter, OwlDateTimeIntl } from 'ng-pick-datetime';
// import { noop } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//     selector: 'ngbd-datepicker-popup',
//     templateUrl: './datetime-picker.component.html',
//     styleUrls: ['./datetime-picker.component.scss'],
//     providers: [
//         { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DatetimePickerComponent), multi: true },
//     ]
// })
// export class DatetimePickerComponent implements OnInit {
//     constructor(dateTimeAdapter: DateTimeAdapter<any>, protected translateService: TranslateService) {

//         if (this.translateService.currentLang == "ar") {
//             dateTimeAdapter.setLocale('ar-SA');
//         }
//     }
//     @Input() public time: boolean;
//     @Input() public datetime: boolean = false;
//     @Input() public min?: Date;
//     @Input() public max?: Date;
//     @Output() change = new EventEmitter<any>();

//     ngOnInit(): void {
//     }

//     isDisabled: boolean = false;

//     pickerState: string = 'calendar';
//     setPickerState = false;
//     _value;
//     private onTouchedCallback: () => void = noop;
//     private onChangeCallback: (_: any) => void = noop;

//     get Value() {
//         return this._value;
//     }

//     set Value(val) {
//         this._value = val;
//         this.onChangeCallback(this._value);
//         this.change.emit(this._value);

//     }

//     writeValue(obj: any): void {

//         this.setTimeState(this.time);
//         this.setDatetimeState(this.datetime);
//         if (obj != undefined) {
//             this._value = obj;
//         } else
//             this._value = null;

//     }

//     registerOnChange(fn) {
//         this.onChangeCallback = fn;
//     }
//     registerOnTouched(fn: any): void {
//         this.onTouchedCallback = fn;
//     }
//     setDisabledState?(isDisabled: boolean) {
//         this.isDisabled = isDisabled;
//     }

//     setTimeState?(time: boolean) {
//         this.pickerState = time ? 'timer' : this.pickerState;
//         this.setPickerState = time;
//     }

//     setDatetimeState?(datetime: boolean) {
//         this.pickerState = datetime ? null : this.pickerState;
//         this.setPickerState = datetime;
//     }
// }
