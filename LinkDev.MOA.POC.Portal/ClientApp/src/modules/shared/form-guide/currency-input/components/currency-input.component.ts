import { Component, OnInit, Input, forwardRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from "@ngx-translate/core";
import { FormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, Validators, NgControl, NG_VALIDATORS, Validator, NgModel, NgForm } from '@angular/forms';

const noop = () => {
};
@Component({
  selector: 'currency-input',
  templateUrl: './currency-input.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CurrencyInputComponent), multi: true },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    }
  ]
})
export class CurrencyInputComponent implements ControlValueAccessor,OnInit,Validator {
  @Input() label: string;
  @Input() required: boolean = false;
  @Input() numeric:boolean = false;
  @Input() disabled:boolean = false;
  @Input() submit:boolean = false;
  @Input() maxLength: number = 28;
  
  private formattedAmount: string;
  placeholder: string ="10,000,000";

  @Output()
  onBlur = new EventEmitter<string>();

  @Output()
  onChange = new EventEmitter<string>();
  
  constructor(private currencyPipe: CurrencyPipe, private translateService: TranslateService) { }
  ngOnInit() { 
      if(this.numeric){
        this.placeholder = "10,000,000.00";
      }
  }
  public validate(c: FormControl) {
      
      if(!c.value && this.required)
      {
        return {
            required: {
                valid: false,
            },
        };
      }
      debugger;
      if (c.value && !/^[0-9]+$/.test(c.value.toString().split('.')[0].split(',').join(""))) {
            return {
                pattern: {
                    valid: false,
                },
            };
        }
    return null;
  }
  transformAmount(element){
    if(this.formattedAmount)
    {
        if(!isNaN(Number(this.formattedAmount.split('.')[0].split(',').join(""))))
            this.formattedAmount = this.currencyPipe.transform(this.formattedAmount.split('.')[0].split(',').join(""), "EGP").split("EGP")[1]; 
        if(!this.numeric){
            this.formattedAmount = this.formattedAmount.split(".")[0];   
        }
        if(element instanceof NgModel)
            element.valueAccessor.writeValue(this.formattedAmount);
    }
  }

    //Placeholders for the callbacks which are later provided
    //by the Control Value Accessor
    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    //get accessor
    get value(): any {
        if (this.formattedAmount) {
            return this.formattedAmount.trim();
        }
        return this.formattedAmount
    };

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.formattedAmount) {

            if (v) {
                this.formattedAmount = v.split('.')[0].split(',').join("").toString().trim();
            }
            else {
                if (v === "") {
                    this.formattedAmount = null;
                }
                else {
                    this.formattedAmount = v;
                }
            }

            this.onChangeCallback(this.formattedAmount);
        }
    }

    //Set touched on blur
    onBlurFn(e) {
        this.transformAmount(e);
        this.onBlur.emit(this.value);
        this.onTouchedCallback();
    }

    //Set touched on change
    onChangeFn() {
        this.onChange.emit(this.value);
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        
        if (value !== this.formattedAmount) {

            if (value) {
                this.formattedAmount = value.toString().trim();
                this.transformAmount(this.required);
            }
            else {
                this.formattedAmount = value;
            }
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