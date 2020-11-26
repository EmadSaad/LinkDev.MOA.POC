import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { validateEmptyStringFactory } from './validateEmptyStringFactory';

@Directive({
    selector: '[emptyString][ngModel]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: EmptyStringValidator, multi: true }
    ]
  })
export class EmptyStringValidator implements Validator {
  validator: ValidatorFn;
  
  constructor() {
    this.validator = validateEmptyStringFactory();
  }
  
  validate(c: FormControl) : ValidationErrors {
    return this.validator(c);
  }
  
}