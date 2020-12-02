import { Component, forwardRef, OnInit, Injectable, EventEmitter, Output, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { NgbDateStruct, NgbCalendar ,  NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './date-picker.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbdDatepickerPopup), multi: true },
  ]
})
export class NgbdDatepickerPopup implements ControlValueAccessor  {
  
  model: NgbDateStruct;
  @Input() isRequiredLabel: boolean = false;
  @Input() label?: string ;
  @Input() readonly : boolean = false;
  @Input() placeholder? : string;
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

  changed($event) {

  }
}


// @Injectable()
// export class CustomDateAdapter {
//   fromModel(value: string): NgbDateStruct {
//     if (!value)
//       return null
//     let parts = value.split('-');
//     let days=parts[2].split('T');
//     return { year: +parts[0], month: +parts[1], day: +days[0] }
//   }

//   toModel(date: NgbDateStruct): string // from internal model -> your mode
//   {
//     return date ? date.year + "-" + ('0' + date.month).slice(-2)
//       + "-" + ('0' + date.day).slice(-2) : null
//   }
// }

// @Injectable()
// export class CustomDateParserFormatter {
//   parse(value: string): NgbDateStruct {
//     if (!value)
//       return null
//     let parts = value.split('/');
//     return { year: +parts[0], month: +parts[1], day: +parts[2] } as NgbDateStruct

//   }
//   format(date: NgbDateStruct): string {
//     return date ? date.year + "/" + ('0' + date.month).slice(-2) + "/" + ('0' + date.day).slice(-2) : null
//   }
// }


// @Component({
//   selector: 'ngbd-datepicker-popup',
//   templateUrl: './date-picker.component.html',
//   providers: [
//     { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgbdDatepickerPopup), multi: true },
//     { provide: NgbDateAdapter, useClass: CustomDateAdapter }]
// })
// export class NgbdDatepickerPopup implements ControlValueAccessor, OnInit {

//   @Output() change = new EventEmitter<any>();

//   ngOnInit(): void {
//   }

//   isDisabled:boolean=false;
//   _value;
//   private onTouchedCallback: () => void = noop;
//   private onChangeCallback: (_: any) => void = noop;


//   get Value() {
//     return this._value;
//   }

//   set Value(val) {
//     this._value = val;
//     this.onChangeCallback(this._value);
//     this.change.emit(this._value);
//   }

//   writeValue(obj: any): void {
//     if (obj != undefined) {
//       this._value = obj;
//     }else 
//     this._value = null;

//   }

//   registerOnChange(fn) {
//     this.onChangeCallback = fn;
//   }
//   registerOnTouched(fn: any): void {
//     this.onTouchedCallback = fn;
//   }
//   setDisabledState?(isDisabled: boolean){
//     this.isDisabled=isDisabled;
// }



// }



