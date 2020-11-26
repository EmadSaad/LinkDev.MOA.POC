import { Component, OnInit, OnChanges, Input, EventEmitter, Output, forwardRef, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const noop = () => {
};

const defaultMax: number = 9999;

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CounterComponent), multi: true },
  ]

})
export class CounterComponent implements ControlValueAccessor, OnChanges, OnInit {

  private innerValue = 0;
  maxLength: number = 4;

  @Input()
  max = 9999;

  @Input()
  disabled = false;

  @Input()
  min = 0;

  @Output()
  onBlur = new EventEmitter<string>();

  @Output()
  valueChanged = new EventEmitter();

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
      this.valueChanged.emit(parseInt(v));
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.max && (isNaN(changes.max.currentValue) || changes.max.currentValue < this.min))
     {
      this.max = changes.max.previousValue;
    }

    if (changes.min && (isNaN(changes.min.currentValue) || changes.min.currentValue > this.max)) {
      this.min = changes.min.previousValue;
    }

  }

  //Set touched on blur
  onBlurFn() {
    this.onBlur.emit(this.value);
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.value = value;
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

  increase() {
    if (!this.disabled) {
      let currentNumber = +this.innerValue;
      if (currentNumber < this.max) currentNumber++;
      this.value = currentNumber;
    }
  }

  decrease() {
    if (!this.disabled) {
      let currentNumber = +this.innerValue;
      if (currentNumber > this.min) currentNumber--;
      this.value = currentNumber;
    }
  }

  onKeyup = ($event) => {
    let currentNumber = +this.innerValue;
    if (currentNumber > this.max) {
      this.value = this.max;
      $event.preventDefault();
      return false;
    }
    else if (isNaN(currentNumber) || currentNumber < this.min) {
      this.value = this.min;
      $event.preventDefault();
      return false;
    }

  }

  onKeydown($event) {
    if ($event.keyCode == 110 || $event.keyCode == 190) {
      $event.preventDefault();
      return false;
    }
  }

}