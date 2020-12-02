
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, LOCALE_ID, forwardRef, Injectable } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicCivil, NgbDatepickerI18n
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number) {
    return WEEKDAYS[weekday - 1];
  }

  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'ngbd-datepicker-islamiccivil',
  templateUrl: './date-picker.component.html',
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicCivil },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbdDatepickerIslamiccivil), multi: true },
  ]
})

export class NgbdDatepickerIslamiccivil implements ControlValueAccessor {

  model: NgbDateStruct;
  @Input() isRequiredLabel: boolean = false;
  @Input() label?: string;
  @Input() readonly: boolean = false;
  _value;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  constructor(private calendar: NgbCalendar , translateService: TranslateService) { }


  get Value() {
    return this._value;
  }

  set Value(val) {
    this._value = val;
    this.onChangeCallback(this._value);
    this.onTouchedCallback();

  }
  writeValue(obj: any): void {
    // this.setTimeState(this.time);
    // this.setDatetimeState(this.datetime);
    if (obj != undefined) {
      this._value = obj;
    } else
      this._value = null;
  }

  registerOnChange(fn) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  changed($event) {

  }
}