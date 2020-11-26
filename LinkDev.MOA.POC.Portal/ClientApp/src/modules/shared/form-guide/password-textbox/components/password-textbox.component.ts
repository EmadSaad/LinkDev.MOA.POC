import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const noop = () => {
};

@Component({
  selector: 'password-textbox',
  templateUrl: './password-textbox.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PasswordTextBoxComponent), multi: true },
  ]
})

export class PasswordTextBoxComponent implements ControlValueAccessor, OnInit {
  ngOnInit(): void {
    if (this.maxLength == null || this.maxLength == undefined) this.maxLength = 50;
  }
  //The internal data model
  private innerValue: any = '';

  @Input() maxLength: number = 50;
  @Input() strength: boolean = false;
  @Input() minLength: number = 8;
  @Input() label: string = '';
  @Input() isRequiredLabel: boolean = false;
  @Input() placeholder: any;
  // @Input() placeholder: any = '';
  //Placeholders for the callbacks which are later provided
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): any {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}