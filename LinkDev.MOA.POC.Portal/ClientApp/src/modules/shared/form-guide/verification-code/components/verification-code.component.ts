import { Component, OnInit, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'adahi-verify-box',
  templateUrl: './verification-code.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => VerificationCodeComponent), multi: true },
  ]
})
export class VerificationCodeComponent implements ControlValueAccessor, OnInit {
  propagateChange: (_: any) => void = () => { };

  @ViewChild("inputs")
  inputs;

  allInputs: HTMLInputElement[]
  value: string[] = ['', '', '', '', '', ''];

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.allInputs = this.elementRef.nativeElement.querySelectorAll('input');
    // this.allInputs[0].focus();

    // allinputs.forEach((i) => { i.addEventListener('keydown', this.onKeyDown.bind(this)) });
    //allinputs.forEach((i) => { i.addEventListener('keyup', this.goToNextInput.bind(this)) });
    this.allInputs.forEach((i) => { i.addEventListener('click', this.onFocus.bind(this)) });
  }

  writeValue(obj: any): void {
    let val = '';
    let allinputs = this.inputs.nativeElement.querySelectorAll('input');
    allinputs.forEach(i => val += i.value);
    this.propagateChange(val.toString().trim());
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  ngOnInit(): void {
 
  }

  public onKeyDown = (e, index) => {

    let key = e.which;
    let allowedNumberKeys = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 229; //Numbers
    let allowedActions = key === 9 || key === 8 || key === 46; //Backspace && Tab 

    if (allowedNumberKeys) {
      //this.value[index] = e.key;
      //this.propagateChange(this.value.join('').trim());
      return true;
    }

    if (key == 8 || key == 46) {
      //this.value[index] = '';
      //e.target.select();
      // this.propagateChange(this.value.join('').trim());
      return true;
    }

    if (key == 9) {
      return true;
    }

    e.preventDefault();
    return false;
  }

  public onFocus = (e) => {
    e.target.select();
  }

  //jQuery Way
  public goToNextInput = (e, index) => {

    //console.log("keyup" , e.key , index);

    this.allInputs.forEach((input, i) => this.value[i] = input.value);
    this.propagateChange(this.value.join('').trim());
    // this.value[index] = e.key;
    // this.propagateChange(this.value.join('').trim());

    let key = e.which;
    let t = $(e.target);
    // let t = e.target;
    let sib = t.next('input');
    // let sib = t.nextElementSibling;

    let allowedNumberKeys = (key >= 48 && key <= 57) || (key >= 96 && key <= 105) || key == 229;

    if (key != 9 && key != 8 && !allowedNumberKeys) {
      e.preventDefault();
      return false;
    }
    else if (key === 9) {
      return true;
    }
    else if (key === 8) {
      sib = t.prev('input');
      // sib = t.previousElementSibling;
    }

    if (!sib || !sib.length) {
      (sib = this.elementRef.nativeElement.querySelector('input') as HTMLInputElement);
      sib.select();
      sib.focus();
    }
    else {
      sib.select().focus();
    }
  }

}
