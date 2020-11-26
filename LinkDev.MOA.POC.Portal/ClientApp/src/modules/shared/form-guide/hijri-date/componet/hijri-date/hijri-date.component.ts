import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Inject, LOCALE_ID, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة']

@Component({
  selector: 'app-hijri-date',
  templateUrl: './hijri-date.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HijriDateComponent), multi: true },
  ]
})
export class HijriDateComponent implements OnChanges, ControlValueAccessor {

  @Input() Date: Date;
  @Input() HijreDate: string;
  @Output() HijreDateChange: EventEmitter<string> = new EventEmitter<string>();


  _value;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Date'] && changes['Date'].currentValue != null && changes['Date'].currentValue != undefined && changes['Date'].currentValue != null) {
      setTimeout(() => {
        var moment = require('moment-hijri');
        var hijirDate = moment(this.Date);
        var month = hijirDate.iMonth();
        var format = `iD ${MONTHS[month]} iYYYY هـ`;
        this.HijreDate = hijirDate.locale('ar-SA').format(format);
        this.HijreDateChange.emit(this.HijreDate);
        this.Value = this.HijreDate;
      });
    }
  }



  get Value() {
    return this._value;
  }

  set Value(val) {
    this._value = val;
    this.onChangeCallback(this._value);
    this.onTouchedCallback();

  }

  writeValue(obj: any): void {
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
  setDisabledState?(isDisabled: boolean) {
  }
}
